
(function(){
"use strict";
var searchInput=document.getElementById('entity-search');
var chapterSearch=document.getElementById('chapter-search');
var chipGroup=document.getElementById('level-filter');
var cards=Array.prototype.slice.call(document.querySelectorAll('[data-search]'));
function filterItems(){
  var q=(searchInput&&searchInput.value||'').trim().toLowerCase();
  var q2=(chapterSearch&&chapterSearch.value||'').trim().toLowerCase();
  var activeChip=chipGroup?chipGroup.querySelector('.chip.active'):null;
  var activeLevel=activeChip?activeChip.dataset.level:'all';
  cards.forEach(function(card){
    var hay=(card.dataset.search||'').toLowerCase();
    var lvl=card.dataset.level||'all';
    var matchQ=(!q||hay.indexOf(q)>=0)&&(!q2||hay.indexOf(q2)>=0);
    var matchLvl=(activeLevel==='all'||lvl===activeLevel);
    card.style.display=(matchQ&&matchLvl)?'':'none';
  });
}
if(searchInput)searchInput.addEventListener('input',filterItems);
if(chapterSearch)chapterSearch.addEventListener('input',filterItems);
if(chipGroup){chipGroup.addEventListener('click',function(e){var chip=e.target.closest('.chip');if(!chip)return;chipGroup.querySelectorAll('.chip').forEach(function(c){c.classList.remove('active')});chip.classList.add('active');filterItems()})}
var root=document.querySelector('[data-page-id]');
if(root){var pid=root.dataset.pageId;var key='enc_study_'+pid;var toggle=document.getElementById('mark-done');var lbl=document.getElementById('study-status');if(toggle){var saved=localStorage.getItem(key);if(saved==='1'){toggle.checked=true;if(lbl)lbl.textContent='خوانده‌شده'}toggle.addEventListener('change',function(){localStorage.setItem(key,toggle.checked?'1':'0');if(lbl)lbl.textContent=toggle.checked?'خوانده‌شده':'در حال مطالعه'})}}
var sidebarLinks=Array.prototype.slice.call(document.querySelectorAll('.chapter-sidebar a[href^="#"]'));
if(sidebarLinks.length&&'IntersectionObserver' in window){
  var targets=sidebarLinks.map(function(a){return document.getElementById(a.getAttribute('href').slice(1))}).filter(Boolean);
  var obs=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){sidebarLinks.forEach(function(a){a.classList.remove('active-link')});var link=sidebarLinks.filter(function(a){return a.getAttribute('href')==='#'+en.target.id})[0];if(link)link.classList.add('active-link')}})},{rootMargin:'-40% 0px -55% 0px'});
  targets.forEach(function(t){obs.observe(t)});
}
})();
