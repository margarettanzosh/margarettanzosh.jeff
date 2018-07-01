// Initialize Firebase
  const config = {
    apiKey: "AIzaSyDNAYGyzlvOhWXkzpda_eXjOezBJfqiLco",
    authDomain: "jwblog-f614f.firebaseapp.com",
    databaseURL: "https://jwblog-f614f.firebaseio.com",
    projectId: "jwblog-f614f",
    storageBucket: "jwblog-f614f.appspot.com",
    messagingSenderId: "282245716688"
  };
  const fb_app = firebase.initializeApp(config);
  const db = fb_app.database();

  let postRef = db.ref("posts");

  getPosts();

  function getPosts() {
    let posts = [];

    postRef.on("value", function(snapshot){
      let data = snapshot.val();
      console.log(data);

      for (let key in data) {
        posts.push(data[key])
      }

      console.log(posts);

      // create html in #postings
      // get most recent post first
      let start = posts.length - 1;
      let html = getHTML(1);

      $('#postings').html(html);
      let numPosts = 1;

      $('#more-blog').click(function() {
        console.log("clicked");
        html = getHTML(numPosts + 1);
        $('#postings').html(html);
    })
  })

  function getHTML(numPosts) {
    let html = '';
    for (let i = posts.length - 1, end = posts.length - 1 - numPosts; i > end; i--) {
      html += '<h4>' + posts[i].headline + '</h4>' +
                  '<small>' + posts[i].date + '</small>' +
                  '<div class="blog-space">' + posts[i].post + '</div>';
    }

    if (posts.length > numPosts) {
      html += '<div id="more-blog" class="blog-link"><a href="#/">More</a></div>';
    }

    return html;
  }
}
