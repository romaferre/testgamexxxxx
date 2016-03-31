
require (["testPackage.package.require-example-include","testPackage.package.require-example-include2"], function(inclEx,inclEx2) {
    out.println('modules loaded');
    var result = inclEx.sum(2,2);
    out.println(result);
    var result2 = inclEx2.sum2(2,2);
    out.println(result2);
});
