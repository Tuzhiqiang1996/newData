## Springboot

[springboot 中文社区](https://springboot.io/)

[springboot搭建](https://start.springboot.io/)

[springboot 基础到高级](https://www.jianshu.com/p/8e3de55d4373)

[springboot ](http://c.biancheng.net/view/4630.html)
>  spring-boot-starter-parent简介

1. 常用版本属性


	 <properties>
        <java.version>1.8</java.version>
    </properties>

2. 常用的dependenceManagement


3. 以spring-boot-starter-开头的开箱即用的工具包

    spring-boot-starter：核心的工具包，提供了自动配置的支持，日志和YAML配置支持；

	spring-boot-starter-activemq：针对快速集成ActiveMQ的工具包；

	spring-boot-starter-aop：提供了快速集成SpringAOP和AspectJ的工具包；

	spring-boot-starter-data-redis：提供了快速集成Redis和Jedis的工具包；

	spring-boot-starter-freemarker：提供了快速集成Freemarker的工具包；

	spring-boot-starter-mail：提供了快速集成邮件发送的工具包；

	spring-boot-starter-test：提供了对Springboot应用的测试工具包；

	spring-boot-starter-web：提供了对web开发的工具包，包括基于SpringMVC的RESTful应用开发，内置的tomcat服务器等；

	spring-boot-starter-actuator：提供了对生产环境中应用监控的工具包；

	spring-boot-starter-logging：提供了对日志的工具包，默认使用Logback；


4. Springboot应用的热部署

使用Springboot提供的spring-boot-devtools包来完成Springboot应用热部署

	  <dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-devtools</artifactId>
	<optional>true</optional>
	</dependency>


- 原理：


	SpringBoot重启是reload重启，通过监控classpath的变化，如果classpath中的文件发生变化，即触发重启。springboot通过两个classpath来完成reload，一个basic classloader中加载不变的类，一个restart classloader中加载classpath中的类，重启的时候，restart classloader中的类丢弃并重新加载；



- 排除资源：



```
	spring.devtools.restart.exclude=static/,templates/*

	spring.devtools.restart.additional-exclude=public/** (处理默认配置排除之外的)

	spring.devtools.restart.enabled=false （禁用自动重启）
```







5. SpringBootApplication简介

6.






