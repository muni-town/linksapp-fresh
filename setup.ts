import {
  Checkbox,
  Confirm,
  Input,
  Number,
  prompt,
} from "https://deno.land/x/cliffy@v0.25.2/prompt/mod.ts";

import { 
  validateUsername, 
  validateHttps,
  validateBio,
  validateLocation,
  validateFeed,
  validateDomain,
  validateMail,
  validateReadme
} from "https://raw.githubusercontent.com/commune-org/linksapp-fresh/main/utils/validator.ts";

import type Profile from "https://raw.githubusercontent.com/commune-org/linksapp-fresh/main/profile.type.ts";

const result = await prompt([{
  name: "username",
  message: "Username (required):", // required
  type: Input,
  minLength: 1,
  maxLength: 50,
  after: async({ username }, next) => {
    const passes = await validateUsername(username)
    if (passes) {
      await next();
    } else {
      await next("username"); // run prompt again
    }
  },
},
{
  name: "avatar",
  message: "Avatar URL (required):", // required
  type: Input,
  minLength: 7,
  after: async({ avatar }, next) => {
    const passes = await validateHttps(avatar)
    if (passes) {
      await next();
    } else {
      await next("avatar"); // run prompt again
    }
  },
},
{
  name: "bio",
  message: "Bio (required):", // required
  type: Input,
  minLength: 1,
  maxLength: 128,
  after: async({ bio }, next) => {
    const passes = await validateBio(bio)
    if (passes) {
      await next();
    } else {
      await next("bio"); // run prompt again
    }
  },
},
{
  name: "location",
  message: "Location (optional):",
  type: Input,
  maxLength: 128,
  after: async({ location }, next) => {
    const passes = await validateLocation(location)
    if (passes) {
      await next();
    } else {
      await next("location"); // run prompt again
    }
  },
},
{
  name: "readme",
  message: "README.md (optional):",
  type: Input,
  after: async({ readme }, next) => {
    const passes = await validateReadme(readme)
    if (passes) {
      await next();
    } else {
      await next("readme"); // run prompt again
    }
  },
},
{
  name: "rss",
  message: "RSS feed (optional):",
  type: Input,
  after: async({ rss }, next) => {
    const passes = await validateFeed(rss)
    if (passes) {
      await next();
    } else {
      await next("rss"); // run prompt again
    }
  },
},
{
  name: "socialAccounts",
  message: "Select social accounts (space bar):",
  type: Checkbox,
  options: [
    "Dribbble",
    "Facebook",
    "GitHub",
    "Instagram",
    "LinkedIn",
    "Twitter",
    "YouTube",
    "Website",
    "Mail",
  ],
},
{
  name: "dribbble",
  message: "Enter Dribbble URL:",
  type: Input,
  minLength: 7,
  before: async({ socialAccounts }, next) => {
    if (socialAccounts?.includes("Dribbble")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async({ dribbble }, next) => {
    const passes = await validateDomain(dribbble, "dribbble.com")
    if (passes) {
      await next();
    } else {
      await next("dribbble"); // run prompt again
    }
  }
},
{
  name: "facebook",
  message: "Enter Facebook URL:",
  type: Input,
  minLength: 7,
  before: async({ socialAccounts }, next) => {
    if (socialAccounts?.includes("Facebook")) {
      await next();
    } else {
      await next(true); // skip
    } 
  },
  after: async({ facebook }, next) => {
    const passes = await validateDomain(facebook, "facebook.com")
    if (passes) {
      await next();
    } else {
      await next("facebook"); // run prompt again
    }
  }
},
{
  name: "github",
  message: "Enter GitHub URL:",
  type: Input,
  minLength: 7,
  before: async({ socialAccounts }, next) => {
    if (socialAccounts?.includes("GitHub")) {
      await next();
    } else {
      await next(true); // skip
    } 
  },
  after: async({ github }, next) => {
    const passes = await validateDomain(github, "github.com")
    if (passes) {
      await next();
    } else {
      await next("github"); // run prompt again
    }
  }
},
{
  name: "instagram",
  message: "Enter Instagram URL:",
  type: Input,
  minLength: 7,
  before: async({ socialAccounts }, next) => {
    if (socialAccounts?.includes("Instagram")) {
      await next();
    } else {
      await next(true); // skip
    } 
  },
  after: async({ instagram }, next) => {
    const passes = await validateDomain(instagram, "instagram.com")
    if (passes) {
      await next();
    } else {
      await next("instagram"); // run prompt again
    }
  }
},
{
  name: "linkedin",
  message: "Enter LinkedIn URL:",
  type: Input,
  minLength: 7,
  before: async({ socialAccounts }, next) => {
    if (socialAccounts?.includes("LinkedIn")) {
      await next();
    } else {
      await next(true); // skip
    } 
  },
  after: async({ linkedin }, next) => {
    const passes = await validateDomain(linkedin, "linkedin.com")
    if (passes) {
      await next();
    } else {
      await next("linkedin"); // run prompt again
    }
  }
},
{
  name: "twitter",
  message: "Enter Twitter URL:",
  type: Input,
  minLength: 7,
  before: async({ socialAccounts }, next) => {
    if (socialAccounts?.includes("Twitter")) {
      await next();
    } else {
      await next(true); // skip
    } 
  },
  after: async({ twitter }, next) => {
    const passes = await validateDomain(twitter, "twitter.com")
    if (passes) {
      await next();
    } else {
      await next("twitter"); // run prompt again
    }
  }
},
{
  name: "youtube",
  message: "Enter YouTube URL:",
  type: Input,
  minLength: 7,
  before: async({ socialAccounts }, next) => {
    if (socialAccounts?.includes("YouTube")) {
      await next();
    } else {
      await next(true); // skip
    } 
  },
  after: async({ youtube }, next) => {
    const passes = await validateDomain(youtube, "youtube.com")
    if (passes) {
      await next();
    } else {
      await next("youtube"); // run prompt again
    }
  }
},
{
  name: "website",
  message: "Enter website URL:",
  type: Input,
  minLength: 7,
  before: async({ socialAccounts }, next) => {
    if (socialAccounts?.includes("Website")) {
      await next();
    } else {
      await next(true); // skip
    } 
  },
  after: async({ website }, next) => {
    const passes = await validateHttps(website)
    if (passes) {
      await next();
    } else {
      await next("website"); // run prompt again
    }
  }
},
{
  name: "mail",
  message: "Enter email address:",
  type: Input,
  minLength: 7,
  before: async({ socialAccounts }, next) => {
    if (socialAccounts?.includes("Mail")) {
      await next();
    } else {
      await next(true); // skip
    } 
  },
  after: async({ mail }, next) => {
    const passes = await validateMail(mail)
    if (passes) {
      await next();
    } else {
      await next("mail"); // run prompt again
    }
  }
},
{
  name: "isBanner",
  message: "Do you want to display a banner?",
  type: Confirm,
  after: async({ isBanner }, next) => {
    if (isBanner) await next("bannerTitle");
  }
},
{
  name: "bannerTitle",
  message: "Banner title (required):",
  type: Input,
  minLength: 1,
  maxLength: 128,
  before: async({ isBanner }, next) => {
    if (isBanner) {
      await next();
    }
  },
},
{
  name: "bannerMessage",
  message: "Banner message (required):",
  type: Input,
  minLength: 1,
  maxLength: 128,
  before: async({ isBanner }, next) => {
    if (isBanner) {
      await next();
    }
  },
}]);

Deno.exit();