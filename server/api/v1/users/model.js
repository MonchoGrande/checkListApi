const mongoose = require('mongoose');
const validator = require('validator');
const { hash, compare } = require('bcryptjs');
const { body } = require('express-validator');
const { Schema } = mongoose;

const fields = {
  firtsname: {
    type: 'string',
    required: true,
    trim: true,
    maxLength: 64,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 64,
  },
  email: {
    type: 'string',
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      messages:(props)=>`${props.value} is not valid email`
    }
  },
  password: {
    type: 'string',
    required: true,
    default: '',
    min: 6,
  },
};

const user = new Schema(fields, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

user
  .virtual('name')
  .get(function getName() {
    return `${this.firtsname} ${this.lastname}`;
  })
  .set(function setName(name) {
    const [firtsname = '', lastname = ''] = name.split(' ');
    this.firtsname = firtsname;
    this.lastname = lastname;
  });
const hiddenFields = ['password'];

user.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  hiddenFields.forEach((field) => {
    if (Object.hasOwnProperty.call(doc, field)) {
      delete doc[field];
    }
  });
  return doc;
};

user.pre('save', async function save(next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

user.methods.verifyPassword = function verifyPassword(password) {
  return compare(password, this.password);
};

const sanitizers =[body('email').isEmail().normalizeEmail()]

module.exports = {
  Model: mongoose.model('user', user),
  fields,
  sanitizers,
};
