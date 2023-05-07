import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
// console.log(uuidv4()); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'



document.addEventListener("click", function (e) {
  if (e.target.dataset.likes) {
    handleLikeClick(e.target.dataset.likes)
  } else if (e.target.dataset.retweet) {
    handleRetweetClicks(e.target.dataset.retweet)
  } else if (e.target.dataset.comments) {
    handleReplyClicks(e.target.dataset.comments)
  } else if (e.target.id === "tweet-btn") {
    handleTweetClickBtn()
  }
  // else if (e.target.id === "reply-tweet-btn") {
  //   handleReplyTweetBtn()
  // }


})

function handleLikeClick(tweetId) {
  const tweetTargetLikes = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId
  })[0]


  if (tweetTargetLikes.isLiked) {
    tweetTargetLikes.likes--
  } else {
    tweetTargetLikes.likes++
  }
  tweetTargetLikes.isLiked = !tweetTargetLikes.isLiked

  render()
}

function handleRetweetClicks(tweetId) {
  const tweetTargetRetweets = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId
  })[0]

  if (tweetTargetRetweets.isRetweeted) {
    tweetTargetRetweets.retweets--
    tweetTargetRetweets.isRetweeted = false
  } else {
    tweetTargetRetweets.retweets++
    tweetTargetRetweets.isRetweeted = true
  }

  render()
}

function handleReplyClicks(replyId) {
  document.getElementById(`replies-${replyId}`).classList.toggle("hidden")

}

function handleTweetClickBtn() {
  const tweetInput = document.getElementById("tweet-input")

  if (tweetInput.value) {
    tweetsData.unshift({
      handle: `marisalex`,
      profilePic: `images/alex.jpg`,
      likes: 0,
      retweets: 0,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4()
    })
  }
  render()
  tweetInput.value = ""
}

// function handleReplyTweetBtn() {
//   const replyInput = document.getElementById("reply-input")
//   // const tweetReply = tweetsData.filter(function (tweet) {
//   //   return tweet.uuid
//   // })[0]

//   // console.log(tweetReply, "tweetreply")

//   // var currentTweet = tweetsData.indexOf


//   tweetsData.forEach(function(tweet){

//       tweet.replies.push({
//            handle: `marisalex`,
//            profilePic: `images/alex.jpg`,
//           tweetText: replyInput.value,
//       })
//        console.log(tweet.replies)
//   })
// }




function getFeed() {
  let feedHtml = ``

  tweetsData.forEach(function (tweet) {

    let likeIconClass = ''

    if (tweet.isLiked) {
      likeIconClass = 'liked'
      console.log(tweet.isLiked)
    }

    let retweetClass = ''
    if (tweet.isRetweeted) {
      retweetClass = 'retweeted'
    }

    let tweetReplies = ""
    tweet.replies.forEach(function (reply) {
      tweetReplies += `<div class="tweet-reply">
        <div class="tweet-inner">
            <img src="${reply.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${reply.handle}</p>
                    <p class="tweet-text">${reply.tweetText}</p>
                </div>
            </div>
    </div>`
    })



    feedHtml += `<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots" data-comments="${tweet.uuid}"></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-heart ${likeIconClass}" data-likes="${tweet.uuid}"></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet ${retweetClass}" data-retweet="${tweet.uuid}"></i>
                   ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
    <textarea placeholder="type your reply" id="reply-input" class="reply-input"></textarea>
    <button class="reply-tweet-btn" id="reply-tweet-btn">Tweet</button>
        ${tweetReplies}
    </div> 
</div>`
  })
  return feedHtml
}

function render() {
  document.getElementById("feed").innerHTML = getFeed()
}

render()
