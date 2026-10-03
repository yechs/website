# Jenkins CI/CD

## Deprecation of Ruby

I encountered this problem while taking over a very old Jenkins server (looks like it has not been properly maintained for >4 years).
While booting up, I encountered the following problem

```
Loading plugin ruby-runtime v0.12 (ruby-runtime) failed perhaps due to plugin dependency issues
java.lang.RuntimeException: unsupported Java version: 11
```

However, it is impossible to boot up Jenkins with any earlier Java version, as Jenkins [requires Java 11](https://www.jenkins.io/blog/2022/06/28/require-java-11/). Now we seem to end up in a dependency conflict.

This error happens because ruby-runtime has been deprecated for a long time (since 2018, see [JEP 7](https://github.com/jenkinsci/jep/blob/master/jep/7/README.adoc)). Thus, the remaining old plugins have prevented Jenkins from starting up.
The solution is to ssh into the server and manually disable the related plugins (for us, `rvm` and `ruby-runtime`) by creating the files `$JENKINS_HOME/plugins/<plugin_name>.jpi.disabled`.

Then, restart Jenkins. It should be good to run again.
