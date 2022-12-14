/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});
*/




const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
 
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  


  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  
  /* find the correct article using the selector (value of 'href' attribute) */
  
  const targerArticle = document.querySelector(articleSelector);
  

  /* add class 'active' to the correct article */
  
  targerArticle.classList.add('active');
};
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector ='.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optAuthorRightList = '.sidebar .authors';
  /*optTagsListSelector = '.tags .list';*/

function generateTitleLinks(customSelector = ''){ 

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML= '';

  
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';
   
  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id');
    
 
    /* find the title element */
    
    
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    
    

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    

    /* insert link into titleList */
   
    titleList.innerHTML = titleList.innerHTML + linkHTML;
   
    /* insert link into HTML variable */

    html = html + linkHTML;
    
  }
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);


  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const TagsWrapper = article.querySelector(optArticleTagsSelector);


    /* make html variable with empty string */
    let html = '';


    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');


    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
  
    for(let tag of articleTagsArray) {
      

      /* generate HTML of the link */
  
      const linkHTML = '<ul><a href="#tag' + tag + '"><span>' + tag + '</span></a></ul>';
      
      

  

      /* add generated code to html variable */
 
      html = html + linkHTML + ' ';
      

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    TagsWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');


  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');


  /* START LOOP: for each active tag link */

  for(let tag of activeTags) {


    /* remove class active */
    tag.articleTagsArray.remove('active');
  }

  /* END LOOP: for each active tag link */


  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagHref= document.querySelectorAll('[href="' + href + '"]');


  /* START LOOP: for each found tag link */
  for(let tag of tagHref) {


    /* add class active */
    tag.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  console.log(allLinksToTags);


  /* START LOOP: for each link */
  for(let link of allLinksToTags){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click',tagClickHandler);


  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty object */
  const allAuthors= {};
  console.log(allAuthors);
  /* find all authors articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for each articles */
  for(let article of articles) {
  /* find authors warapper*/
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* get author atribute*/
    const author = article.getAttribute('data-author');

    /* generate HTML of the link */
    


    const linkHTML ='<li><a href="#author-' + author + '">' + author + '</a></li>'; 


    /* add author  */
    
    authorWrapper.innerHTML = linkHTML;
    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors[author]) {
      /* [NEW] add tag to allAuthors object */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    /* END LOOP: for every article */
  }
  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector(optAuthorRightList);

  /* [NEW] create variable for all links HTML code */

  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each tag in allAuthors: */
  for (let author in allAuthors) {

    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    allAuthorsHTML += '<li><a href="#author-' + author + '"><span>' + author + ' (' + allAuthors[author] + ')</span></a></li> ';
    /* [NEW] END LOOP: for each tag in allAuthors: */
  }
  /*[NEW] add HTML from allAuthorsHTML to tagList */
  authorList.innerHTML = allAuthorsHTML;
}


generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */

  event.preventDefault();
  

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;


  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');


  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all tag links with class active */
  const linksActive = document.querySelectorAll('a.active[href^="#author-"]');



  /* START LOOP: for each active tag link */

  for(let link of linksActive) {


    /* remove class active */
    link.classList.remove('active');
    /* END LOOP: for each active tag link */
  }




  /* find all tag links with "href" attribute equal to the "href" constant */
  const allLinks= document.querySelectorAll('[href="' + href + '"]');


  /* START LOOP: for each found tag link */
  for(let links of allLinks) {


    /* add class active */
    links.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthors() {
  /* find all links to tags */
  const allAuthorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */
  for (let link of allAuthorLinks)
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
}
addClickListenersToAuthors();














