document.onload(function() {
    
  const clearTabs = function() {
    nav.forEach(function(item) {
      item.classList.remove("active");
    });
  };
  const nav = document.querySelectorAll(".dashboard__sidebar__link");
  nav.forEach(function(item) {
    item.addEventListener("click", function() {
      clearTabs();
      this.classList.toggle("active");
    });
  });
  
});
