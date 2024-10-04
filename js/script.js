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
    data.forEach(element => {
        const div = document.createElement('div');
        div.innerHTML = `
    <div class="bg-[#797DFC1A] border-[1px] border-solid border-[#797DFC1A] p-8 rounded-xl">
    <div class="relative w-20 h-20 rounded-lg bg-slate-300 mb-4">
    <img src="./assets/logo.png" alt="">
    <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-600"></span>
    </div>
    <div class="space-y-4">
        <div class="flex  space-x-2 items-center text-base font-semibold">
            <h3># Music</h3>
            <h4>Author : Awlad Hossain</h4>
        </div>
        <h2 class="text-2xl font-bold">10 Kids Unaware of Their Halloween Costume</h2>
        <p class="text-base">It’s one thing to subject yourself to ha Halloween costume mishap because, <br> hey that’s your prerogative</p>
        <div class="flex items-center space-x-4">
            <div class="flex space-x-2 items-center text-lg">
                <i class="fa-regular fa-message"></i>
                <h2>560</h2>
            </div>
            <div class="flex space-x-2 items-center text-lg">
                <i class="fa-regular fa-eye"></i>
                <h2>560</h2>
            </div>
            <div class="flex space-x-2 items-center text-lg">
                <i class="fa-regular fa-clock"></i>
                <h2>560</h2>
            </div>
            

        </div>
    </div>
 </div>
    `;
        postContainer.append(div)
    });
    console.log(data);
}