require.config({
    baseUrl: "js/app"
});

require (["include-example","include-example2"], function(inclEx,inclEx2) {
    print('modules loaded');
    var result = inclEx.sum(2,2);
    print(result);
    var result2 = inclEx2.sum2(2,2);
    print(result2);
});