import {
  isEmail,
  isString,
  lengthBetween,
  match,
  required,
  validate,
} from "validasaur";

const httpsRule = [required, isString, match(/^(https):\/\//)];
const usernameRule = [required, isString, lengthBetween(1, 50)];
const bioRule = [required, isString, lengthBetween(1, 128)];
const locationRule = [isString, lengthBetween(1, 128)];
const readmeRule = [isString, match(/^(https):\/\/(.*)(\.md)$/)];
const rssRule = [isString, match(/^(https):\/\//)];
const domainRule = (domain: string) => [required, isString, match(new RegExp(`^(https):\/\/${domain}\/`))];
const mailRule = [required, isEmail];

const validateHttps = async (avatar: string | undefined) => {
  const [passes, _] = await validate({ avatar }, {
    avatar: httpsRule,
  });
  return passes;
};

const validateUsername = async (username: string | undefined) => {
  const [passes, _] = await validate({ username }, {
    username: usernameRule,
  });
  return passes;
};

const validateBio = async (bio: string | undefined) => {
  const [passes, _] = await validate({ bio }, {
    bio: bioRule,
  });
  return passes;
};

const validateLocation = async (location: string | undefined) => {
  const [passes, _] = await validate({ location }, {
    location: locationRule,
  });
  return passes;
};

const validateFeed = async (rss: string | undefined) => {
  const [passes, _] = await validate({ rss }, {
    rss: rssRule,
  });
  return passes; 
}

const validateDomain = async (url: string | undefined, domain: string) => {
  const [passes, _] = await validate({ url }, {
    url: domainRule(domain),
  });
  return passes; 
}

const validateMail = async (mail: string | undefined) => {
  const [passes, _] = await validate({ mail }, {
    mail: mailRule,
  });
  return passes; 
}

const validateReadme = async (readme: string | undefined) => {
  const [passes, _] = await validate({ readme }, {
    readme: readmeRule,
  });
  return passes;
};

export {
  validateHttps,
  validateBio,
  validateLocation,
  validateFeed,
  validateDomain,
  validateMail,
  validateReadme,
  validateUsername,
};
