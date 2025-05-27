document.addEventListener("DOMContentLoaded", () => {
    loadPosts();
  });
  
  async function loadPosts() {
    try {
      const response = await fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=xnTBQUNTE6hxNFT5jfAqxd4lhYLkNeGp');
      const data = await response.json();
      const posts = data.response.docs;
  
      console.log(data);
  
      const container = document.getElementById('posts-container');
      posts.forEach((post,index) => {
        // Проверяем, есть ли мультимедиа (изображения)
        const imageUrl = post.multimedia?.thumbnail?.url 
        ? post.multimedia.thumbnail.url 
        : null;
        
        
        console.log(imageUrl)

        console.log("Multimedia:", post.multimedia);
  
        const postElement = document.createElement('div');
        console.log(post);

        const publishDate = new Date(post.pub_date);
        const formattedDate = publishDate.toLocaleDateString();
        
        postElement.classList.add('post')
        postElement.innerHTML = `
            <div class="info">
                <div class="author">
                    <img src="img/avatar.png" alt="" class="avatar">
                    <div class="author-text">${post.byline.original}<span class="in"> in</span> ${post.news_desk} · <span class="july">${formattedDate}</span></div>
                </div>
                <div class="title clickable">${post.headline.main}</div>
                <div class="title-text-2">
                    ${post.snippet}
                </div>
                <div class="under-panel">
                    <div class="under-panel-buttons">
                        <div class="javascript">${post.section_name}</div>
                        <div class="min">${Math.floor(post.word_count / 200)} min read</div>
                        <div> · </div>
                        <div class="selected">Selected for you</div>
                    </div>
                    <div class="box">
                        <div class="color-box"></div>
                        <div class="color-box"></div>
                        <div class="color-box"></div>
                    </div>
                </div>
            </div>
              <div class="photo">   
            ${imageUrl 
            ? `<img src="${imageUrl}" alt="Article image" class="photo1" style="max-width: 300px;">` 
            : `<div style="width: 300px; height: 200px; background-color: gray;">No image available</div>`}
                </div>
            </div>
          </div>
        `;
        
        container.appendChild(postElement);
        const hr = document.createElement('hr');
        container.appendChild(hr);
        

        const title = postElement.querySelector('.title.clickable')
        title.addEventListener('click', () => {
            console.log('Title clicked!');
            window.location.href = `./post.html?post=${index}&imageUrl=${encodeURIComponent(imageUrl)}`;
        })
      });
    } catch (error) {
      console.error("Ошибка загрузки постов:", error);
    }
  }
  


