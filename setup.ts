try {
  const dirStat = Deno.statSync("./linksapp-fresh/");
  if (dirStat.isDirectory) {
    console.log(red("💥 Directory ./linksapp-fresh/ already exists."));
    Deno.exit(1);
  }
} catch {}

import {
  Checkbox,
  Confirm,
  Input,
  prompt,
} from "https://deno.land/x/cliffy@v0.25.4/prompt/mod.ts";

import { red, yellow } from "https://deno.land/std@0.161.0/fmt/colors.ts";

console.log(yellow("Linksapp Setup Wizard 🪄"));
console.log(
  "Fork the repo -> https://github.com/commune-org/linksapp-fresh/fork",
);

const repo: string = await Input.prompt({
  message: "Forked .git HTTPS URL:",
  minLength: 7,
});

const repoDir = repo.split("/").pop()?.replace(".git", "");

const cloneCmd = Deno.run({
  cmd: [
    "git",
    "clone",
    repo,
  ],
});

const cloneStatus = await cloneCmd.status();

if (!cloneStatus.success) {
  console.log(red("💥 Git clone failed. Make sure to provide correct URL."));
  Deno.exit(1);
}

const usernameErrorMessage = "Username not valid";
const bioErrorMessage = "Bio not valid";
const locationErrorMessage = "Location not valid";
const feedErrorMessage = "RSS feed not valid";
const urlErrorMessage = (domain: string) => (`URL format must be: ${domain}`);
const mailErrorMessage = "Email address not valid";

import {
  validateBio,
  validateDomain,
  validateFeed,
  validateHttps,
  validateHttpsImage,
  validateHttpsMarkdown,
  validateLocation,
  validateMail,
  validateUsername,
} from "./utils/validator.ts";

import type Profile from "https://raw.githubusercontent.com/commune-org/linksapp-fresh/main/profile.type.ts";

const promoptResult = await prompt([{
  name: "username",
  message: "Username (required):", // required
  type: Input,
  minLength: 1,
  maxLength: 50,
  after: async ({ username }, next) => {
    const passes = await validateUsername(username);
    if (passes) {
      await next();
    } else {
      console.log(red(usernameErrorMessage));
      await next("username"); // run prompt again
    }
  },
}, {
  name: "avatar",
  message: "Avatar URL (required):", // required
  type: Input,
  minLength: 7,
  after: async ({ avatar }, next) => {
    const passes = await validateHttpsImage(avatar);
    if (passes) {
      await next();
    } else {
      console.log(
        red(
          urlErrorMessage(
            "https://example.com/.../example.(jpg|jpeg|png|webp|avif|gif|svg)",
          ),
        ),
      );
      await next("avatar"); // run prompt again
    }
  },
}, {
  name: "bio",
  message: "Bio (required):", // required
  type: Input,
  minLength: 1,
  maxLength: 128,
  after: async ({ bio }, next) => {
    const passes = await validateBio(bio);
    if (passes) {
      await next();
    } else {
      console.log(red(bioErrorMessage));
      await next("bio"); // run prompt again
    }
  },
}, {
  name: "location",
  message: "Location (optional):",
  type: Input,
  maxLength: 128,
  after: async ({ location }, next) => {
    const passes = await validateLocation(location);
    if (passes) {
      await next();
    } else {
      console.log(red(locationErrorMessage));
      await next("location"); // run prompt again
    }
  },
}, {
  name: "readme",
  message: "README.md (optional):",
  type: Input,
  after: async ({ readme }, next) => {
    const passes = await validateHttpsMarkdown(readme);
    if (passes) {
      await next();
    } else {
      console.log(red(urlErrorMessage("https://example.com/.../example.md")));
      await next("readme"); // run prompt again
    }
  },
}, {
  name: "rss",
  message: "RSS feed (optional):",
  type: Input,
  after: async ({ rss }, next) => {
    const passes = await validateFeed(rss);
    if (passes) {
      await next();
    } else {
      console.log(red(feedErrorMessage));
      await next("rss"); // run prompt again
    }
  },
}, {
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
}, {
  name: "dribbble",
  message: "Enter Dribbble URL:",
  type: Input,
  minLength: 7,
  before: async ({ socialAccounts }, next) => {
    if (socialAccounts?.includes("Dribbble")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async ({ dribbble }, next) => {
    const passes = await validateDomain(dribbble, "dribbble.com");
    if (passes) {
      await next();
    } else {
      console.log(red(urlErrorMessage("https://dribbble.com/username")));
      await next("dribbble"); // run prompt again
    }
  },
}, {
  name: "facebook",
  message: "Enter Facebook URL:",
  type: Input,
  minLength: 7,
  before: async ({ socialAccounts }, next) => {
    if (socialAccounts?.includes("Facebook")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async ({ facebook }, next) => {
    const passes = await validateDomain(facebook, "facebook.com");
    if (passes) {
      await next();
    } else {
      console.log(red(urlErrorMessage("https://facebook.com/username")));
      await next("facebook"); // run prompt again
    }
  },
}, {
  name: "github",
  message: "Enter GitHub URL:",
  type: Input,
  minLength: 7,
  before: async ({ socialAccounts }, next) => {
    if (socialAccounts?.includes("GitHub")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async ({ github }, next) => {
    const passes = await validateDomain(github, "github.com");
    if (passes) {
      await next();
    } else {
      console.log(red(urlErrorMessage("https://github.com/username")));
      await next("github"); // run prompt again
    }
  },
}, {
  name: "instagram",
  message: "Enter Instagram URL:",
  type: Input,
  minLength: 7,
  before: async ({ socialAccounts }, next) => {
    if (socialAccounts?.includes("Instagram")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async ({ instagram }, next) => {
    const passes = await validateDomain(instagram, "instagram.com");
    if (passes) {
      await next();
    } else {
      console.log(red(urlErrorMessage("https://www.instagram.com/username")));
      await next("instagram"); // run prompt again
    }
  },
}, {
  name: "linkedin",
  message: "Enter LinkedIn URL:",
  type: Input,
  minLength: 7,
  before: async ({ socialAccounts }, next) => {
    if (socialAccounts?.includes("LinkedIn")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async ({ linkedin }, next) => {
    const passes = await validateDomain(linkedin, "linkedin.com");
    if (passes) {
      await next();
    } else {
      console.log(red(urlErrorMessage("https://linkedin.com/username")));
      await next("linkedin"); // run prompt again
    }
  },
}, {
  name: "twitter",
  message: "Enter Twitter URL:",
  type: Input,
  minLength: 7,
  before: async ({ socialAccounts }, next) => {
    if (socialAccounts?.includes("Twitter")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async ({ twitter }, next) => {
    const passes = await validateDomain(twitter, "twitter.com");
    if (passes) {
      await next();
    } else {
      console.log(red(urlErrorMessage("https://twitter.com/username")));
      await next("twitter"); // run prompt again
    }
  },
}, {
  name: "youtube",
  message: "Enter YouTube URL:",
  type: Input,
  minLength: 7,
  before: async ({ socialAccounts }, next) => {
    if (socialAccounts?.includes("YouTube")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async ({ youtube }, next) => {
    const passes = await validateDomain(youtube, "youtube.com");
    if (passes) {
      await next();
    } else {
      console.log(red(urlErrorMessage("https://youtube.com/username")));
      await next("youtube"); // run prompt again
    }
  },
}, {
  name: "website",
  message: "Enter website URL:",
  type: Input,
  minLength: 7,
  before: async ({ socialAccounts }, next) => {
    if (socialAccounts?.includes("Website")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async ({ website }, next) => {
    const passes = await validateHttps(website);
    if (passes) {
      await next();
    } else {
      console.log(red(urlErrorMessage("https://example.com/")));
      await next("website"); // run prompt again
    }
  },
}, {
  name: "mail",
  message: "Enter email address:",
  type: Input,
  minLength: 7,
  before: async ({ socialAccounts }, next) => {
    if (socialAccounts?.includes("Mail")) {
      await next();
    } else {
      await next(true); // skip
    }
  },
  after: async ({ mail }, next) => {
    const passes = await validateMail(mail);
    if (passes) {
      await next();
    } else {
      console.log(red(mailErrorMessage));
      await next("mail"); // run prompt again
    }
  },
}, {
  name: "isBanner",
  message: "Do you want to display a banner?",
  type: Confirm,
  after: async ({ isBanner }, next) => {
    if (isBanner) await next("bannerTitle");
  },
}, {
  name: "bannerTitle",
  message: "Banner title (required):",
  type: Input,
  minLength: 1,
  maxLength: 128,
  before: async ({ isBanner }, next) => {
    if (isBanner) {
      await next();
    } else {
      await next(true); // skip
    }
  },
}, {
  name: "bannerMessage",
  message: "Banner message (required):",
  type: Input,
  minLength: 1,
  maxLength: 128,
  before: async ({ isBanner }, next) => {
    if (isBanner) {
      await next();
    } else {
      await next(true); // skip
    }
  },
}]);

const {
  avatar,
  username,
  bio,
  location,
  dribbble,
  facebook,
  github,
  instagram,
  linkedin,
  twitter,
  youtube,
  website,
  mail,
  isBanner,
  bannerTitle,
  bannerMessage,
} = promoptResult;

const profile: Profile = {
  $schema:
    "https://raw.githubusercontent.com/commune-org/linksapp-fresh/main/profile.schema.json",
  avatar: avatar!,
  username: username!,
  bio: bio!,
  links: [],
  socialAccounts: {},
};

if (location) profile["location"] = location;
if (dribbble) profile.socialAccounts["dribbble"] = dribbble;
if (facebook) profile.socialAccounts["facebook"] = facebook;
if (github) profile.socialAccounts["github"] = github;
if (instagram) profile.socialAccounts["instagram"] = instagram;
if (linkedin) profile.socialAccounts["linkedin"] = linkedin;
if (twitter) profile.socialAccounts["twitter"] = twitter;
if (youtube) profile.socialAccounts["youtube"] = youtube;
if (website) profile.socialAccounts["website"] = website;
if (mail) profile.socialAccounts["mail"] = mail;
if (isBanner) profile["banner"] = { title: bannerTitle!, text: bannerMessage! };

let addLinks = true;

while (addLinks) {
  console.log("Adding a link 🔗");
  const link = await prompt([{
    name: "title",
    type: Input,
    message: "Link title:",
    minLength: 1,
    maxLength: 50,
  }, {
    name: "url",
    type: Input,
    message: "Link URL:",
    minLength: 7,
    after: async ({ url }, next) => {
      const passes = await validateHttps(url);
      if (passes) {
        await next();
      } else {
        console.log(red(urlErrorMessage("https://example.com/...")));
        await next("url"); // run prompt again
      }
    },
  }]);
  profile.links.push({ url: link.url!, title: link.title! });

  addLinks = await Confirm.prompt("Add another link?");
}

try {
  Deno.writeTextFileSync(
    `./${repoDir}/profile.json`,
    JSON.stringify(profile),
  );
} catch (e) {
  console.log(red(e));
  Deno.exit(1);
}

const gitAddCmd = Deno.run({
  cmd: [
    "git",
    "add",
    ".",
  ],
  cwd: `./${repoDir}`,
});

const gitAddStatus = await gitAddCmd.status();

if (!gitAddStatus.success) {
  console.log(red('💥 "git add" command failed. Something went wrong.'));
  Deno.exit(1);
}

const gitCommitCmd = Deno.run({
  cmd: [
    "git",
    "commit",
    "-m",
    '"setup wizard"',
  ],
  cwd: `./${repoDir}`,
});

const gitCommitStatus = await gitCommitCmd.status();

if (!gitCommitStatus.success) {
  console.log(red('💥 "git commit" command failed. Something went wrong.'));
  Deno.exit(1);
}

const gitPushCmd = Deno.run({
  cmd: [
    "git",
    "push",
    "origin",
    "main",
  ],
  cwd: `./${repoDir}`,
});

const gitPushStatus = await gitPushCmd.status();

if (!gitPushStatus.success) {
  console.log(red('💥 "git push" command failed. Something went wrong.'));
  Deno.exit(1);
}

console.log(red("✨ Done!"));
Deno.exit();
