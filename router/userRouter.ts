import express from 'express'
const router = express.Router();
const User = require("../models/User");

const jwt = require("jsonwebtoken");


/*
    @usage : Login a User
    @url : /api/users/login
    @fields : email , password
    @method : POST
    @access : PUBLIC
 */

export interface IRequest {
  avatarUrl: string
  city: string
  companyName: string
  countryCode: string
  email: string
  facebookId: string
  firstName: string
  gender: string
  isAmbassador: boolean
  isBusiness: boolean
  isVerified: boolean
  jobTitle: string
  lastName: string
  payload: string
  phoneNumber: string
  requestNonce: string
  signature: string
  signatureAlgorithm: string
  street: string
  successful: boolean
  twitterId: string
  url: string
  zipcode: string
  }

router.post(
  "/login",
  async (request, response) => {
    try {
      const data : IRequest  = request.body;


      // create a token
      if (data.companyName) {
        let payload = {
          user: {
            companyName: data.companyName
          },
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET_KEY,
          { expiresIn: 360000000 },
          (err, token: string) => {
            if (err) {
              throw err;
            }
            response.status(200).json({
              msg: "Token Created",
              token: token,
            });
          }
        );
      }
      else {
        response.status(400).json({ errors: [{ msg: 'Please Enter Company Name' }] });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);
