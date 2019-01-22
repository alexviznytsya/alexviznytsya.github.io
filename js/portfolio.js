var project_data;

function loadProject(project) {
    $("#projectName").html(project.name).append($("<small>").text(" " + project.shortName));
    $(".carousel-indicators").text("");
    $("#carousel_item").text("");
    $.each(project.carouselImages, function(k, v) {
        let indicator = $("<li>");
        let slideItem = $("<div>").addClass("carousel-item");
        let slideImage = $("<img>");

        if(k == 0) {
            indicator.addClass("active");
            slideItem.addClass("active");
        }

        indicator.attr("data-target", "#carouselIndicators");
        indicator.attr("data-slide-to", k);
        slideImage.addClass("d-block w-100");
        slideImage.attr("src", v);
        slideItem.append(slideImage);
        $(".carousel-indicators").append(indicator);
        $("#carousel_item").append(slideItem);
    });
    
    $("#projectDescription").html(project.description);
    $("#projectDetails").text("");
    $.each(project.details, function(k, v) {
        $("#projectDetails").append($("<li>").text(v));
    });
    $("#githubURL").attr("href", project.git_url).text(project.git_url);
    if($("#projectName").hasClass("template")) {
        $("#projectName").removeClass("template");
        $("#projectContent").removeClass("template");
    }
}

$(document).ready(function() {
    $.getJSON("projects.json", function(data) {
        project_data = data;
        $.each(data, function(k, v) {
            if (v.active) {
                loadProject(v);
            }
            let preview = $(".preview.template").clone();
            preview.removeClass("template");
            preview.find("img").attr("src", v.previewImage);
            preview.find("div").text(v.previewLabel);
            preview.attr("data-proj", k);
            $("#previewContainer").append(preview);
        });
    }).always(function() {
        $(".preview").on("click", function(event) {
            loadProject(project_data[$(this).attr("data-proj")]);
        });
    });
});