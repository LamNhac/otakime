/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",
    "./static/src/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily:{
        "maven":['Maven Pro','sans-serif']
      },

    
    backgroundImage:{
      "about-mobile":"url('https://firebasestorage.googleapis.com/v0/b/otakime-dc208.appspot.com/o/logo%2Fabout-mobile.jpg?alt=media&token=82f4a838-2952-4005-97ce-110112d5c19d')",
      "about-pc":"url('https://firebasestorage.googleapis.com/v0/b/otakime-dc208.appspot.com/o/logo%2Fabout-pc.jpg?alt=media&token=45ebe457-d35a-4e65-b450-77d7ff66f809')",
      "manga-index":"url('https://firebasestorage.googleapis.com/v0/b/otakime-dc208.appspot.com/o/logo%2FManga.jpg?alt=media&token=55df2100-f1f0-481e-82a4-ac9c3a58d39b')"

    }
  },

}
}
