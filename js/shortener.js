function makeShort() {
    var longUrl = window.location.href;
    $.ajax({
        url: "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyA-H2-dqMtLZV2JYMoRj82JuZKmY1Zu6FU",
        type: 'POST',
        data: JSON.stringify({"longUrl": longUrl}),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(response) {
            $("#shorturl").val(response.id);
        },
        error: function(err) {
            $("#shorturl").val("Error");
        }
    });
}