

const stories = document.querySelectorAll('.stories');
const categories = document.querySelectorAll('.categories');


let dragStory = null;


for(var a = 0; a < stories.length;a++)
{
  const story = stories[a];
  console.log(story.parentElement.id);

  story.addEventListener('dragstart', function() {
      console.log("You are dragging an item");

      dragStory = story;



      setTimeout(function () {

          story.style.display = 'none';

      },0);
  });

  story.addEventListener('dragend',function () {
      console.log("You are no longer dragging an item");
      setTimeout(function () {

          story.style.display = 'block';
          dragStory=null;
          },0);
});


  for (var b = 0; b < categories.length;b++) {
        let category = categories[b];

        category.addEventListener('dragover', function (e) {

            e.preventDefault();

        });

        category.addEventListener('dragenter', function (e) {
            e.preventDefault();
            this.style.backgroundColor = '#778899';

        });

        category.addEventListener('dragleave', function () {
            this.style.backgroundColor = 'whitesmoke';
        })

        category.addEventListener('drop',function (ev) {

         this.appendChild(dragStory);
         console.log(dragStory.parentElement.id);
         this.style.backgroundColor = 'whitesmoke';

        });
  }
}

// add new story to not started

// can't access the db here, will append that code when we move to jesse's branch
/*
function addStoryDynam(){
    ns = document.getElementById('Not Started'); //get column element
    nsInner = ns.innerHTML; // get contents of column
    ns.innerHTML = nsInner + '<br><div class="stories" draggable="true">Item 1</div>'; // append new content to column contents

}*/