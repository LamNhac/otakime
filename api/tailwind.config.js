/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.html", "./static/src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        maven: ["Maven Pro", "sans-serif"],
      },

      backgroundImage: {
        "about-mobile":
          "url('https://firebasestorage.googleapis.com/v0/b/otakime-dc208.appspot.com/o/logo%2Fabout-mobile.jpg?alt=media&token=82f4a838-2952-4005-97ce-110112d5c19d')",
        "about-pc":
          "url('https://firebasestorage.googleapis.com/v0/b/otakime-dc208.appspot.com/o/logo%2Fabout-pc.jpg?alt=media&token=45ebe457-d35a-4e65-b450-77d7ff66f809')",
        "manga-index":
          "url('https://firebasestorage.googleapis.com/v0/b/otakime-dc208.appspot.com/o/logo%2FManga.jpg?alt=media&token=55df2100-f1f0-481e-82a4-ac9c3a58d39b')",
        "evildead-movie":
          "url('https://firebasestorage.googleapis.com/v0/b/otakime-dc208.appspot.com/o/poster%20movie%2Fevil%20dead%2Fbg.jpg?alt=media&token=6a14163b-b77c-47bd-acfa-e149e5ee48b4')",
        "evildead-logo":
          "url('https://firebasestorage.googleapis.com/v0/b/otakime-dc208.appspot.com/o/poster%20movie%2Fevil%20dead%2FLogo.png?alt=media&token=a72b70ff-75cf-46d1-a88c-bb9450e974a8')",
        "evildead-chance":
          "url('https://firebasestorage.googleapis.com/v0/b/otakime-dc208.appspot.com/o/poster%20movie%2Fevil%20dead%2Fpromotion.jpg?alt=media&token=eb2aafcc-6308-41e2-a2cd-48adb0cbe41c')",
        "evildead-tagline":
          "url('https://firebasestorage.googleapis.com/v0/b/otakime-dc208.appspot.com/o/poster%20movie%2Fevil%20dead%2FCritic_tagline.png?alt=media&token=0d9a1a92-a5e8-41fa-bdf3-48db1e28dde9')",
          "evildead-promo-cheese":"url('https://firebasestorage.googleapis.com/v0/b/otakime-dc208.appspot.com/o/poster%20movie%2Fevil%20dead%2Fpromo_cheese.png?alt=media&token=fd3b29c5-675d-438b-9eed-d9c552478699')"
      },
    },
    backgroundPosition:{
      "center":"center",
      "promo-center":"80rem 3rem"
    }
  },
};
