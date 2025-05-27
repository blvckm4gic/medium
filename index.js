async function loadPost(index, imageUrl) {
    try {
        const response = await fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=xnTBQUNTE6hxNFT5jfAqxd4lhYLkNeGp');
        const data = await response.json();

        const post = data.response.docs[index];
        
        if (post) {
            
            const image = imageUrl ? imageUrl : 'img/big-photo.png';  
            console.log(post.lead_paragraph);

            const postDetails = `
                <div class="profile">
                    <img src="img/avatar.png" alt="" class="avatar1">
                    <div class="author2">
                        <div class="author-name">${post.byline.original || 'Unknown Author'}</div>
                        <div class="author-info">
                            <div class="author-info-text">${new Date(post.pub_date).toLocaleDateString()}</div>
                            <div class="author-info-text">·</div>
                            <div class="author-info-text">${post.word_count} words</div>
                        </div>
                    </div>
                    <div class="links">
                        <img src="img/linkedin.png" alt="" class="links-photo">
                        <img src="img/facebook.png" alt="" class="links-photo">
                        <img src="img/twitter.png" alt="" class="links-photo">
                    </div>
                </div>
                <div class="text">
                    <div class="top-text">${post.headline.main}</div>
                    <div class="mini-text">${post.abstract}</div>
                </div>
                <div class="photo">
                    <img src="${image}" alt="Post Image" class="big-photo">
                </div>
                <div class="info">
                    <div class="subheader">Article Text</div>
                    <div class="info-text">${post.snippet}</div>
                </div>
                <div class="panel">
                    <div class="mini-panel">
                        <div class="likes">
                            <img src="img/likes.png" alt="" class="likes-photo"> 180
                        </div>
                        <div class="comments">
                            <img src="img/comments.png" alt="" class="comments-photo"> 12
                        </div>
                    </div>
                    <div class="save">
                        <img src="img/save.png" alt="" class="save">
                    </div>
                </div>
            `;
            document.getElementById('post-details-container').innerHTML = postDetails;
        } else {
            document.getElementById('post-details-container').innerHTML = "Post not found!";
        }
    } catch (error) {
        console.error("Ошибка загрузки поста:", error);
        document.getElementById('post-details-container').innerHTML = "Error loading post!";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postIndex = urlParams.get('post');
    const imageUrl = urlParams.get('imageUrl');

    if (postIndex !== null) {
        loadPost(postIndex, imageUrl);
    } else {
        document.getElementById('post-details-container').innerHTML = "No post selected!";
    }
});

const strelka = document.querySelector('.strelka')
strelka.addEventListener('click', ()=>
{
    window.location.href = `./index.html`;
})


