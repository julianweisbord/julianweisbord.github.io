var ajaxer = function()
{
    return this;
}

ajaxer.prototype.get_query_string = function(obj)
{
    var str = "";
    if ( typeof obj !== "undefined" )
    {
        str = "?";
        for (var key in obj) {
            if (str != "?") {
                str += "&";
            }
            str += key + "=" + encodeURIComponent(obj[key]);
        }
    }
    return str;
}

ajaxer.prototype.request = function(url, post, callback)
{
    // So jquery doesn't have to be included
    // http://stackoverflow.com/questions/8567114/how-to-make-an-ajaxer-call-without-jquery
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else
    {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function()
    {
        if ( xmlhttp.readyState == XMLHttpRequest.DONE )
        {
            if ( xmlhttp.status == 200 )
            {
                if ( typeof callback === "function" )
                {
                    callback( xmlhttp.responseText );
                }
            }
            else if ( xmlhttp.status == 400 )
            {
                console.log('AJAX ERROR: There was an error 400')
            }
            else
            {
                console.log('AJAX ERROR: something else other than 200 was returned')
            }
        }
    }
    if ( typeof post === "undefined" || Object.keys(post).length < 1 )
    {
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
    else
    {
        var send_data;
        if ( Object.prototype.toString.call(post) !== "[object FormData]" )
        {
            send_data = new FormData();
            for ( var prop in post )
            {
                send_data.append(prop, post[prop]);
            }
        }
        else
        {
            send_data = post;
        }
        xmlhttp.open("POST", url, true);
        xmlhttp.send(send_data);
    }
}

ajaxer.prototype.requestJSON = function(url, post, callback)
{
    var json_callback = function (un_parsed)
    {
        if ( typeof callback === "function" )
        {
            callback( JSON.parse( un_parsed ) );
        }
    }
    this.request(url, post, json_callback);
}

ajaxer.prototype.update = function(base, extension)
{
    for (var prop in extension)
    {
        try
        {
            base[prop] = extension[prop];
        }
        catch(warning)
        {
        }
    }
    return base;
}

ajaxer.prototype.correct_params = function(query, post, data)
{
    if ( typeof data !== "undefined" && data != false )
    {
        // POST request
        if ( Object.keys(post).length > 0
            || Object.prototype.toString.call(data) === "[object FormData]" )
        {
            // Add to form data
            if ( Object.prototype.toString.call(data) === "[object FormData]" )
            {
                for ( var prop in post )
                {
                    data.append(prop, post[prop]);
                }
                post = data;
            }
            // Add to object
            else
            {
                for ( var prop in data )
                {
                    post[prop] = data[prop];
                }
            }
        }
        // GET request
        else
        {
            query = this.update(query, data);
        }
    }
    return [query, post];
}
ajax = new ajaxer();
