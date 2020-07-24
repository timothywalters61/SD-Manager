

const stories = document.querySelectorAll('.stories');
const categories = document.querySelectorAll('.categories');


let dragStory = null;

for(var a = 0; a < stories.length;a++)
{
  const story = stories[a];

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
            this.style.backgroundColor = '#708090';
        })

        category.addEventListener('drop',function (ev) {

         this.appendChild(dragStory);
         this.style.backgroundColor = '#708090';

        });
  }
}