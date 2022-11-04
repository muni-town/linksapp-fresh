import {
  isEmail,
  isString,
  lengthBetween,
  match,
  required,
  validate,
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

import { parseFeed } from "https://deno.land/x/rss@0.5.6/mod.ts";

const httpsRule = [required, isString, match(/^(https):\/\//)];
const usernameRule = [required, isString, lengthBetween(1, 50)];
const imageRule = [
  required,
  isString,
  match(/^https:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/),
];
const bioRule = [required, isString, lengthBetween(1, 128)];
const locationRule = [isString, lengthBetween(1, 128)];
const markdownRule = [isString, match(/^https:\/\/.+\.(md)$/)];
const rssRule = [isString, match(/^(https):\/\//)];
const domainRule = (
  domain: string,
) => [required, isString, match(new RegExp(`^(https):\/\/${domain}\/`))];
const mailRule = [required, isEmail];

const validateHttps = async (url: string | undefined) => {
  const [passes, _] = await validate({ url }, {
    url: httpsRule,
  });
  return passes;
};

const validateUsername = async (username: string | undefined) => {
  const [passes, _] = await validate({ username }, {
    username: usernameRule,
  });
  return passes;
};

const validateHttpsImage = async (avatar: string | undefined) => {
  const [passes, _] = await validate({ avatar }, {
    avatar: imageRule,
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
  if (!rss) return true; // means that RSS was skipped
  const [passes, _] = await validate({ rss }, {
    rss: rssRule,
  });
  if (!passes) return false;
  try {
    const response = await fetch(rss);
    const xml = await response.text();
    const _ = await parseFeed(xml);
    return true;
  } catch (_) {
    return false;
  }
};

const validateDomain = async (url: string | undefined, domain: string) => {
  const [passes, _] = await validate({ url }, {
    url: domainRule(domain),
  });
  return passes;
};

const validateMail = async (mail: string | undefined) => {
  const [passes, _] = await validate({ mail }, {
    mail: mailRule,
  });
  return passes;
};

const validateHttpsMarkdown = async (readme: string | undefined) => {
  const [passes, _] = await validate({ readme }, {
    readme: markdownRule,
  });
  return passes;
};

export {
  validateBio,
  validateDomain,
  validateFeed,
  validateHttps,
  validateHttpsImage,
  validateHttpsMarkdown,
  validateLocation,
  validateMail,
  validateUsername,
};
