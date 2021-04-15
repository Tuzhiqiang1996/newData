

# MyBatis-Plus

[官网](https://mybatis.plus/)

参考 https://blog.csdn.net/Artisan_w/article/details/110424159





## 多数据源配置



在 pom.xml  添加

```xml
  <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>dynamic-datasource-spring-boot-starter</artifactId>
            <version>3.0.0</version>
        </dependency>
```

在application 中配置多数据源

```yml
spring:
  datasource:
    dynamic:
      primary: master #设置默认的数据源或者数据源组,默认值即为master
      strict: false #设置严格模式,默认false不启动. 启动后在未匹配到指定数据源时候会抛出异常,不启动则使用默认数据源.
      datasource:
        master:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/tudemo?useUnicode=true&useSSL=false&characterEncoding=utf8&serverTimezone=Asia/Shanghai
    username: root
    password:
      master2:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://localhost:3306/ry-vue?useUnicode=true&useSSL=false&characterEncoding=utf8&serverTimezone=Asia/Shanghai
        username: root
        password:
```



在 impl 数据服务实现层 （在service 和impl 均可以实现）

加入@DS()注释 指定那个数据库

不加为默认的数据库

```java
@Service
@DS("master2")
public class user2ServiceImpl extends ServiceImpl<user2rMapper, user2> implements user2Service {

}

```

