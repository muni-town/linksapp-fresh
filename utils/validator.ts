import {
  isEmail,
  isString,
  lengthBetween,
  match,
  required,
  validate,
  validateObject,
} from "validasaur";
import Profile from "../profile.type.ts";

const avatarRule = [required, isString, match(/^(https):\/\//)];
const usernameRule = [required, isString, lengthBetween(1, 50)];
const bioRule = [required, isString, lengthBetween(1, 128)];
const locationRule = [isString, lengthBetween(1, 128)];
const readmeRule = [isString, match(/^(https):\/\/(.*)(\.md)$/)];

const validateAvatar = async (avatar: string) => {
  const [passes, _] = await validate({ avatar }, {
    avatar: avatarRule,
  });
  return passes;
};

const validateUsername = async (username: string) => {
  const [passes, _] = await validate({ username }, {
    username: usernameRule,
  });
  return passes;
};

const validateBio = async (bio: string) => {
  const [passes, _] = await validate({ bio }, {
    bio: bioRule,
  });
  return passes;
};

const validateLocation = async (location: string) => {
  const [passes, _] = await validate({ location }, {
    location: locationRule,
  });
  return passes;
};

const validateReadme = async (readme: string) => {
  const [passes, _] = await validate({ readme }, {
    readme: readmeRule,
  });
  return passes;
};

const validateProfile = async (profile: Profile) => {
  const [passes, errors] = await validate(profile, {
    avatar: avatarRule,
    username: usernameRule,
    bio: bioRule,
    location: locationRule,
    readme: readmeRule,
    socialAccounts: validateObject(true, {
      dribbble: [isString, match(/^(https):\/\/dribbble.com\//)],
      facebook: [isString, match(/^(https):\/\/facebook.com\//)],
      github: [isString, match(/^(https):\/\/github.com\//)],
      instagram: [isString, match(/^(https):\/\/instagram.com\//)],
      linkedin: [isString, match(/^(https):\/\/linkedin.com\//)],
      twitter: [isString, match(/^(https):\/\/twitter.com\//)],
      youtube: [isString, match(/^(https):\/\/youtube.com\//)],
      website: [isString, match(/^(https):\/\//)],
      mail: isEmail,
    }),
  });

  return [passes, errors];
};

export {
  validateAvatar,
  validateBio,
  validateLocation,
  validateProfile,
  validateReadme,
  validateUsername,
};
