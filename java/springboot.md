## Springboot

[springboot 中文社区](https://springboot.io/)

[springboot搭建](https://start.springboot.io/)

[springboot 基础到高级](https://www.jianshu.com/p/8e3de55d4373)

[springboot ](http://c.biancheng.net/view/4630.html)
>  spring-boot-starter-parent简介

1. ###  常用版本属性  


	 <properties>
	    <java.version>1.8</java.version>
	</properties>

2. ### 常用的dependenceManagement


3. ### 以spring-boot-starter-开头的开箱即用的工具包

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


4. ### Springboot应用的热部署




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


5. ### SpringBootApplication简介



Spring Boot 项目的启动注解是：@SpringBootApplication，其实它就是由下面三个注解组成的：

	@Configuration
	
	@ComponentScan
	
	@EnableAutoConfiguration

其中 @EnableAutoConfiguration 是实现自动配置的入口，该注解又通过 @Import 注解导入了AutoConfigurationImportSelector，在该类中加载 META-INF/spring.factories 的配置信息。然后筛选出以 EnableAutoConfiguration 为 key 的数据，加载到 IOC 容器中，实现自动配置功能！

6. ### 什么是嵌入式服务器？我们为什么要使用嵌入式服务器呢?




思考一下在你的虚拟机上部署应用程序需要些什么。

第一步：安装 Java

第二部：安装 Web 或者是应用程序的服务器（Tomat/Wbesphere/Weblogic 等等）

第三部：部署应用程序 war 包

如果我们想简化这些步骤，应该如何做呢？

让我们来思考如何使服务器成为应用程序的一部分？

你只需要一个安装了 Java 的虚拟机，就可以直接在上面部署应用程序了，

是不是很爽？

这个想法是嵌入式服务器的起源。

当我们创建一个可以部署的应用程序的时候，我们将会把服务器（例如，tomcat）嵌入到可部署的服务器中。

例如，对于一个 Spring Boot 应用程序来说，你可以生成一个包含 Embedded Tomcat 的应用程序 jar。你就可以像运行正常 Java 应用程序一样来运行 web 应用程序了。

嵌入式服务器就是我们的可执行单元包含服务器的二进制文件（例如，tomcat.jar）。


7. ### 微服务同时调用多个接口，怎么支持事务的啊？

支持分布式事务，可以使用Spring Boot集成 Aatomikos来解决，但是我一般不建议这样使用，因为使用分布式事务会增加请求的响应时间，影响系统的TPS。一般在实际工作中，会利用消息的补偿机制来处理分布式的事务。

8. ### shiro和oauth还有cas他们之间的关系是什么？问下您公司权限是如何设计，还有就是这几个概念的区别。

cas和oauth是一个解决单点登录的组件，shiro主要是负责权限安全方面的工作，所以功能点不一致。但往往需要单点登陆和权限控制一起来使用，所以就有 cas+shiro或者oauth+shiro这样的组合。

token一般是客户端登录后服务端生成的令牌，每次访问服务端会进行校验，一般保存到内存即可，也可以放到其他介质；redis可以做Session共享，如果前端web服务器有几台负载，但是需要保持用户登录的状态，这场景使用比较常见。

我们公司使用oauth+shiro这样的方式来做后台权限的管理，oauth负责多后台统一登录认证，shiro负责给登录用户赋予不同的访问权限。

9. ### 各服务之间通信，对Restful和Rpc这2种方式如何做选择？

在传统的SOA治理中，使用rpc的居多；Spring Cloud默认使用restful进行服务之间的通讯。rpc通讯效率会比restful要高一些，但是对于大多数公司来讲，这点效率影响甚微。我建议使用restful这种方式，易于在不同语言实现的服务之间通讯。


10. ### 怎么设计无状态服务

对于无状态服务，首先说一下什么是状态：如果一个数据需要被多个服务共享，才能完成一笔交易，那么这个数据被称为状态。进而依赖这个“状态”数据的服务被称为有状态服务，反之称为无状态服务。

那么这个无状态服务原则并不是说在微服务架构里就不允许存在状态，表达的真实意思是要把有状态的业务服务改变为无状态的计算类服务，那么状态数据也就相应的迁移到对应的“有状态数据服务”中。

场景说明：例如我们以前在本地内存中建立的数据缓存、Session缓存，到现在的微服务架构中就应该把这些数据迁移到分布式缓存中存储，让业务服务变成一个无状态的计算节点。迁移后，就可以做到按需动态伸缩，微服务应用在运行时动态增删节点，就不再需要考虑缓存数据如何同步的问题。

11. ### Spring Cache 三种常用的缓存注解和意义？



@Cacheable ，用来声明方法是可缓存，将结果存储到缓存中以便后续使用相同参数调用时不需执行实际的方法，直接从缓存中取值。

@CachePut，使用 @CachePut 标注的方法在执行前，不会去检查缓存中是否存在之前执行过的结果，而是每次都会执行该方法，并将执行结果以键值对的形式存入指定的缓存中。

@CacheEvict，是用来标注在需要清除缓存元素的方法或类上的，当标记在一个类上时表示其中所有的方法的执行都会触发缓存的清除操作。

12. ### Spring Boot 如何设置支持跨域请求？



现代浏览器出于安全的考虑， HTTP 请求时必须遵守同源策略，否则就是跨域的 HTTP 请求，默认情况下是被禁止的，IP（域名）不同、或者端口不同、协议不同（比如 HTTP、HTTPS）都会造成跨域问题。

一般前端的解决方案有：

- ① 使用 JSONP 来支持跨域的请求，JSONP 实现跨域请求的原理简单的说，就是动态创建<script>标签，然后利用<script>的 SRC 不受同源策略约束来跨域获取数据。缺点是需要后端配合输出特定的返回信息。
- ② 利用反应代理的机制来解决跨域的问题，前端请求的时候先将请求发送到同源地址的后端，通过后端请求转发来避免跨域的访问。


后来 HTML5 支持了 CORS 协议。CORS 是一个 W3C 标准，全称是”跨域资源共享”（Cross-origin resource sharing），允许浏览器向跨源服务器，发出 XMLHttpRequest 请求，从而克服了 AJAX 只能同源使用的限制。它通过服务器增加一个特殊的 Header[Access-Control-Allow-Origin]来告诉客户端跨域的限制，如果浏览器支持 CORS、并且判断 Origin 通过的话，就会允许 XMLHttpRequest 发起跨域请求。

前端使用了 CORS 协议，就需要后端设置支持非同源的请求，Spring Boot 设置支持非同源的请求有两种方式。

第一，配置 CorsFilter。



```java
@Configuration
public class GlobalCorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
          config.addAllowedOrigin("*");
          config.setAllowCredentials(true);
          config.addAllowedMethod("*");
          config.addAllowedHeader("*");
          config.addExposedHeader("*");

        UrlBasedCorsConfigurationSource configSource = new UrlBasedCorsConfigurationSource();
        configSource.registerCorsConfiguration("/**", config);

        return new CorsFilter(configSource);jvav
    }
}
```

需要配置上述的一段代码。第二种方式稍微简单一些。

第二，在启动类上添加：



```java


public class Application extends WebMvcConfigurerAdapter {  

    @Override  
    public void addCorsMappings(CorsRegistry registry) {  

        registry.addMapping("/**")  
                .allowCredentials(true)  
                .allowedHeaders("*")  
                .allowedOrigins("*")  
                .allowedMethods("*");  

    }  
}  

```

第三 在项目中使用

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
//                .allowedOrigins("*")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS")
                .allowCredentials(true)
                .maxAge(3600)
                .allowedHeaders("*");
    }
}
```







12. ## Spring 、Spring Boot 和 Spring Cloud 的关系?

Spring 最初最核心的两大核心功能 Spring Ioc 和 Spring Aop 成就了 Spring，Spring 在这两大核心的功能上不断的发展，才有了 Spring 事务、Spring Mvc 等一系列伟大的产品，最终成就了 Spring 帝国，到了后期 Spring 几乎可以解决企业开发中的所有问题。

Spring Boot 是在强大的 Spring 帝国生态基础上面发展而来，发明 Spring Boot 不是为了取代 Spring ,是为了让人们更容易的使用 Spring 。

Spring Cloud 是一系列框架的有序集合。它利用 Spring Boot 的开发便利性巧妙地简化了分布式系统基础设施的开发，如服务发现注册、配置中心、消息总线、负载均衡、断路器、数据监控等，都可以用 Spring Boot 的开发风格做到一键启动和部署。

Spring Cloud 是为了解决微服务架构中服务治理而提供的一系列功能的开发框架，并且 Spring Cloud 是完全基于 Spring Boot 而开发，Spring Cloud 利用 Spring Boot 特性整合了开源行业中优秀的组件，整体对外提供了一套在微服务架构中服务治理的解决方案。

用一组不太合理的包含关系来表达它们之间的关系。

Spring ioc/aop > Spring > Spring Boot > Spring Cloud



#### Redis 的数据类型有哪些

Redis 五种数据类型，每种数据类型都有相关的命令，几种类型分别如下：

1. String（字符串）
2. List（列表）
3. Hash（字典）
4. Set（集合）
5. Sorted Set（有序集合）

Redis 有五种常见的数据类型，每种数据类型都有各自的使用场景，通用的字符串类型使用最为广泛，普通的 Key/Value 都是这种类型；列表类型使用的场景经常有粉丝列表，关注列表的场景；字典类型即哈希表结构，这个类型的使用场景也很广泛，在各种系统里面都会用到，可以用来存放用户或者设备的信息，类似于 HashMap 的结构；Redis set 提供的功能与列表类型类似也是一个列表的功能，区别是 Set 是去重的；有序集合功能与 Set 一样，只不过是有顺序的。



#### Redis 的内存回收与Key 的过期策略

##### Redis 内存过期策略

###### 过期策略的配置

Redis 随着使用的时间越来越长，占用的内存会越来越大，那么当 Redis 内存不够的时候，我们要知道 Redis 是根据什么策略来淘汰数据的，在配置文件中我们使用 `maxmemory-policy` 来配置策略，如下图



![image-20191113214158260](http://www.justdojava.com/assets/images/2019/java/image_ziyou/02.png)

我们可以看到策略的值由如下几种：

1. volatile-lru: 在所有带有过期时间的 key 中使用 LRU 算法淘汰数据；
2. alkeys-lru: 在所有的 key 中使用最近最少被使用 LRU 算法淘汰数据，保证新加入的数据正常；
3. volatile-random: 在所有带有过期时间的 key 中随机淘汰数据；
4. allkeys-random: 在所有的 key 中随机淘汰数据；
5. volatile-ttl: 在所有带有过期时间的 key 中，淘汰最早会过期的数据；
6. noeviction: 不回收，当达到最大内存的时候，在增加新数据的时候会返回 error，不会清除旧数据，这是 Redis 的默认策略；

> volatile-lru, volatile-random, volatile-ttl 这几种情况在 Redis 中没有带有过期 Key 的时候跟 noeviction 策略是一样的。淘汰策略是可以动态调整的，调整的时候是不需要重启的，原文是这样说的，我们可以根据自己 Redis 的模式来动态调整策略。 ”To pick the right eviction policy is important depending on the access pattern of your application, however you can reconfigure the policy at runtime while the application is running, and monitor the number of cache misses and hits using the Redis INFO output in order to tune your setup.“

###### 策略的执行过程

1. 客户端运行命令，添加数据申请内存；
2. Redis 会检查内存的使用情况，如果已经超过的最大限制，就是根据配置的内存淘汰策略去淘汰相应的 key，从而保证新数据正常添加；
3. 继续执行命令。

###### 近似的 LRU 算法

Redis 中的 LRU 算法不是精确的 LRU 算法，而是一种经过采样的LRU，我们可以通过在配置文件中设置 `maxmemory-samples 5` 来设置采样的大小，默认值为 5，我们可以自行调整。官方提供的采用对比如下，我们可以看到当采用数设置为 10 的时候已经很接近真实的 LRU 算法了。



##### Key 的过期策略

设置带有

过期时间的 key

前面介绍了 Redis 的内存回收策略，下面我们看看 Key 的过期策略，提到 Key 的过期策略，我们说的当然是带有 expire 时间的 key，如下

![image-20191113233350118](http://www.justdojava.com/assets/images/2019/java/image_ziyou/04.png)



通过 `redis> set name ziyouu ex 100` 命令我们在 Redis 中设置一个 key 为 name，值为 ziyouu 的数据，从上面的截图中我们可以看到右下角有个 TTL，并且每次刷新都是在减少的，说明我们设置带有过期时间的 key 成功了。



###### Redis 如何清除带有过期时间的 key

对于如何清除过期的 key 通常我们很自然的可以想到就是我们可以给每个 key 加一个定时器，这样当时间到达过期时间的时候就自动删除 key，这种策略我们叫**定时策略**。这种方式对内存是友好的，因为可以及时清理过期的可以，但是由于每个带有过期时间的 key 都需要一个定时器，所以这种方式对 CPU 是不友好的，会占用很多的 CPU，另外这种方式是一种主动的行为。

有主动也有被动，我们可以不用定时器，而是在每次访问一个 key 的时候再去判断这个 key 是否到达过期时间了，过期了就删除掉。这种方式我们叫做**惰性策略**，这种方式对 CPU 是友好的，但是对应的也有一个问题，就是如果这些过期的 key 我们再也不会访问，那么永远就不会删除了。

Redis 服务器在真正实现的时候上面的两种方式都会用到，这样就可以得到一种折中的方式。另外在**定时策略**中，从官网我们可以看到如下说明

> Specifically this is what Redis does 10 times per second:
>
> 1. Test 20 random keys from the set of keys with an associated expire.
> 2. Delete all the keys found expired.
> 3. If more than 25% of keys were expired, start again from step 1.

意思是说 Redis 会在有过期时间的 Key 集合中随机 20 个出来，删掉已经过期的 Key，如果比例超过 25%，再重新执行操作。每秒中会执行 10 个这样的操作。

#### Redis是什么？

解读

Redis（Remote Dictionary Server )，即远程字典服务，是一个开源的使用ANSI [C语言](https://baike.baidu.com/item/C语言)编写、支持网络、可基于内存亦可持久化的日志型、Key-Value[数据库](https://baike.baidu.com/item/数据库/103728)，并提供多种语言的API。从2010年3月15日起，Redis的开发工作由VMware主持。从2013年5月开始，Redis的开发由[Pivotal](https://baike.baidu.com/item/Pivotal)赞助。

redis是一个key-value存储系统，一个高性能的key-value数据库，支持主从同步，

启动Redis-server **进行持久化存储**



## **NoSQL概述**

### **什么是NoSQL**

NoSQL不仅仅是SQL，它是Not Only SQL 的缩写，也是众多非关系型数据库的统称NoSQL和关系型数据库一样，也是用来存储数据的仓库。

为什么需要NoSQL？
随着互联网的高速发展，数据量、访问量呈爆发式式增长。比如12306中国铁路票务系统。
一年售出车票有30多亿张；
网上售票比例超过了80%；
互联网高峰日售出车票达到了1282多万张；
高峰时每秒售票超出1000张；
网站高峰日访问量超过了1600亿次……
12306售票系统
已成为全球最大的票务交易系统
中国人民彻夜排队买票已成为历史

这么多的数据都是需要存储的，然而传统的关系型数据库面对这些海量数据的存储，以及实现高访问量、高并发读/写，就会显的力不从心，尤其是当面对超大规模、高并发、高吞吐量的大型动态网站的时候，就会暴露出很多难以克服的问题，影响用户体验。为了满足对海量数据的高速存储需求，实现高并发、高吞吐量，NoSQL应运而生。NoSQL的出现可以解决传统关系型数据库所不能解决的问题。 

### **NoSQL特点**

1. 容易扩展，方便使用，数据之间没有关系。
2. 数据模型非常灵活，无需提前为要存储的数据建立字段类型，随时可以存储自定义的数据格式。
3. 适合大数据量、高性能的存储。
4. 具有高并发读/写、高可用性。



