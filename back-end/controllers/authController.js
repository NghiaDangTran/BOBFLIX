const User = require('../models/User');
const Token = require('../models/Token');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const sendVerificationEmail = require('../utils/sendVerficationEmail');
const { attachMutipleCookiesToResponse, isTokenValid } = require('../utils/jwt');
const e = require('express');
const sendResetPassword = require('../utils/sendResetPasswordEmail')
const createHash = require('../utils/createHash')
//register
//register
//register
const register = async (req, res) => {
  console.log("hello")

  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }


  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';
  const verificationToken = crypto.randomBytes(40).toString('hex')

  const user = await User.create({ name, email, password, role, verificationToken });
  //send verification token back onlu while testing in postman

  // console.log(req.protocal)
  // console.log(req.get('host'))
  // console.log(req.get('x-foward-dedhost'))








  const orgen = "http://localhost:3000"
  await sendVerificationEmail({ name: name, email, verificationToken, origin: orgen })
  res.status(StatusCodes.CREATED).json({ msg: 'Sucess! please check your email to verify account', verificationToken: user.verificationToken })

  // const tokenUser = createTokenUser(user);
  // attachCookiesToResponse({ res, user: tokenUser });
  // res.status(StatusCodes.CREATED).json({ user: tokenUser });
};
//login
//login
//login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });

  if (!user) {
    console.log('invalid user')
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    console.log('invalid user password')

    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError('Please verify your email');
  }


  const tokenUser = createTokenUser(user);
  // attachCookiesToResponse({ res, user: tokenUser });

  //create resfresh token
  let
    refreshToken

  const existingToken = await Token.findOne({ user: user._id })
  if (existingToken) {
    console.log(existingToken)
    const { isValid } = existingToken
    console.log(isValid)
    if (!isValid) {
      throw new CustomError.UnauthenticatedError('Invalid credentials');

    }
    refreshToken = existingToken.refreshToken
    attachMutipleCookiesToResponse({ res, user: tokenUser, refreshToken: refreshToken });

    res.status(StatusCodes.OK).json({ user: tokenUser });
    return
  }


  refreshToken = crypto.randomBytes(40).toString('hex')
  const userAgent = req.headers['user-agent']
  console.log(userAgent)
  const ip = req.ip
  const userToken = { refreshToken, ip, userAgent: userAgent, user: user._id }

  await Token.create(userToken)

  attachMutipleCookiesToResponse({ res, user: tokenUser, refreshToken: refreshToken });
  //check for existing token
  let existToken = ''

  res.status(StatusCodes.OK).json({ user });
};



//logout
//logout
//logout


const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user })
  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  console.log(token, email, password)
  if (!token || !email || !password) {
    throw new CustomError.BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ email });
  console.log("Found user", user)
  if (user) {
    const currentDate = new Date();
  
    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      console.log("curr password update ", createHash(token))
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }

  res.send('reset password');
};
//forgotpass
//forgotpass
//forgotpass
//forgotpass
const forgotPassword = async (req, res) => {
  const { email } = req.body
  if (!email) {
    console.log(1)
    throw new CustomError.BadRequestError('Please provide email');

  }

  const user = await User.findOne({ email })
  if (!user) {
    console.log(2)

    throw new CustomError.UnauthenticatedError('No User found');
  }
  if (user) {
    const passwordToken = crypto.randomBytes(70).toString('hex')
    // send email
    const origin = 'http://localhost:3000';
    await sendResetPassword({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });
    const tenMinutes = 1000 * 60 * 10
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes)
    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate
    console.log("password token when forgot", passwordToken)
    await user.save()


  }
  res.status(StatusCodes.OK).json({ msg: "Please check your email" })
}

//verifyemail
//verifyemail
//verifyemail
const verifyEmail = async (req, res,) => {
  const { verificationToken, email } = req.body
  console.log(verificationToken, email)

  const user = await User.findOne({ email });


  if (!user) {
    console.log(3)

    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }


  const sameToken = verificationToken === user.verificationToken
  if (!sameToken) {
    console.log(4)
    throw new CustomError.UnauthenticatedError('Verify fail')
  }
  user.isVerified = true
  const tempDate = new Date()
  user.verified = tempDate
  user.verificationToken = ""
  await user.save()



  res.status(StatusCodes.OK).json({ msg: "User verifed" })

}
// verifytoken
// verifytoken
// verifytoken
const VerifyToken = async (req, res) => {
  const { refreshToken, accessToken } = req.signedCookies;
  console.log("stqrt check", !!refreshToken, !!accessToken)

  try {

    if (accessToken) {
      const payload = isTokenValid(accessToken);

      console.log("begin test", payload)
      res.status(StatusCodes.OK).json({ user: payload.user })
      return
    }
    const payload = isTokenValid(refreshToken);
    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });
    
    console.log("begin test2", existingToken)
    if (!existingToken) {
      throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }



    res.status(StatusCodes.OK).json({ user: payload.user })
    return

  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }
}


module.exports = {
  register,
  login,
  logout,
  resetPassword, forgotPassword, verifyEmail, VerifyToken
};
