window.onload = function(){

	var projectList = document.querySelector(".project-list");
	var listItems = projectList.querySelectorAll(".item");
	var projectPreview = document.querySelector(".project-preview");
	var previewItems = projectPreview.querySelectorAll(".img-preview");

	for (var i = 0; i < listItems.length; i++) {
		listItems[i].querySelector('a').addEventListener('click', function(){
			ga('send', 'event', 'Project', 'click', this.getAttribute("data-item"));
		});
		listItems[i].querySelector('a').addEventListener('mouseenter', function(){
			var projectCode = this.getAttribute("data-item");
			for (var i = 0; i < previewItems.length; i++) {
				var previewCode = previewItems[i].getAttribute("data-item");
				if(previewCode == projectCode){
					previewItems[i].classList.add("-selected");
					projectPreview.classList.add("-" + String(previewCode));
				}else{
					previewItems[i].classList.remove("-selected");
					projectPreview.classList.remove("-" + String(previewCode));
				}
			};
		});
	};

};