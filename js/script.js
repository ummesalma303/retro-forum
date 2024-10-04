const loadAllPost = async (category) => {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts${
        category ? `?category=${category}` : ""
      }`
    );
    const data = await res.json();
    displayAllPost(data.posts);
}

loadAllPost();
const handleByCategory = () => {
    const searchInput = document.getElementById("searchPosts").value;
     loadAllPost(searchInput);
}

const displayAllPost = (data) => {
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML=" "
    data.forEach(data => {
        const div = document.createElement('div');
        div.innerHTML = `
    <div class="bg-[#797DFC1A] border-[1px] border-solid border-[#797DFC1A] p-8 rounded-xl">
    <div class="relative w-20 h-20 rounded-lg bg-slate-300 mb-4">
    <img src=${data.image} alt="">
    <span class="absolute -top-2 -right-2 w-5 h-5 rounded-full ${data.isActive?'bg-green-600':'bg-gray-500'}"></span>
    </div>
    <div class="space-y-4">
        <div class="flex  space-x-2 items-center text-base font-semibold">
            <h3># ${data.category}</h3>
            <h4>Author : ${data.author.name}</h4>
        </div>
        <h2 class="text-2xl font-bold">${data.title}</h2>
        <p class="text-base">It’s one thing to subject yourself to ha Halloween costume mishap because, <br> hey that’s your prerogative</p>
        <div class="flex items-center justify-between">

        <div class="flex items-center space-x-4">
            <div class="flex space-x-2 items-center text-lg">
                <i class="fa-regular fa-message"></i>
                <h2>${data.comment_count}</h2>
            </div>
            <div class="flex space-x-2 items-center text-lg">
                <i class="fa-regular fa-eye"></i>
                <h2>${data.view_count}</h2>
            </div>
            <div class="flex space-x-2 items-center text-lg">
                <i class="fa-regular fa-clock"></i>
                <h2>${data.posted_time}</h2>
            </div>
        </div>

        <div>
        <button onclick="markAsRead('${data.title}','${data.view_count}')" class ="btn btn-circle bg-green-500 text-white text-xl hover:text-green-500"><i class="fa-solid fa-envelope-open-text"></i></button>
        </div>
        </div>
    </div>
 </div>
    `;
        postContainer.append(div)
    });
}

const markAsRead = (title,view) => {
    // console.log(title, view);
    const markAsReadContainer = document.getElementById('markAsReadContainer')
    markAsReadContainer.innerHTML += `
     <div class="flex justify-between bg-white p-5 m-3 rounded-lg space-x-3">
                  <h2 class="text-lg font-bold text-black">${title}</h2>
                  <div class="flex space-x-1 items-center ">
                    <i class="fa-regular fa-eye"></i>
                    <h2>${view}</h2>
                </div>
                </div>
    `
    const prevCounter = document.getElementById('markAsReadCounter').innerText
    const convertCounter = parseInt(prevCounter)
    const sum=convertCounter+1
    document.getElementById('markAsReadCounter').innerText=sum
    console.log();
}

const latestPostLoad = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
      const data = await res.json();
      latestPostDisplay(data);
}
/**
 * {
    "cover_image": "https://i.ibb.co/VYGSkLz/pexels-jeshootscom-442576.jpg",
    "profile_image": "https://i.ibb.co/z8zx95w/pexels-davide-de-giovanni-1649675.jpg",
    "title": "Gaming Enthusiast Expert in Play",
    "description": "Leading gaming expert with a wealth of knowledge and passion for all things gaming",
    "author": {
        "name": "John Doe",
        "designation": "ROR Developer",
        "posted_date": "29 January 2024"
    }
} 
 */
const latestPostDisplay = (data) => {
    console.log(data);
    const latestPostContainer = document.getElementById('latest-post-container')
    data.forEach(post => {
        const postDiv = document.createElement('div')
        postDiv.innerHTML = `
        <div class="card lg:w-96 pb-5 bg-base-100 shadow-2xl">
        <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
              <img
                  src=${post.cover_image}
                  alt="Shoes"
                  class="rounded-xl"
              />
          </figure>
           <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
            <p class="opacity-50 text-start">
                  <i class="fa-solid fa-calendar-days me-2"></i>${post.author.posted_date ? `${post.author.posted_date}` : 'No publish date'}
              </p>
              <h2 class="card-title text-start">${post.title}</h2>
              <p class="text-start">
                  ${post.description}
              </p>
              <div class="card-actions flex gap-5 items-center">
                  <div class="avatar">
                      <div
                          class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                      >
                          <img
                          src=${post.profile_image}
                          />
                      </div>
                  </div>
              <div>
              <h3 class="text-start font-extrabold">${post.author.name}</h3>
              <p class="text-start opacity-60">${post.author?.designation || "Unknown"}</p>
          </div>
      </div>
     
           </div>
        </div>
        `
        latestPostContainer.append(postDiv)
        console.log(post);
    });
}
latestPostLoad()