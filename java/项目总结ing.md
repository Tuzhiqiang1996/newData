## java  get/post/put/delete
### get

1. @GetMapping("/user") 直接获取资源  无

2.  @GetMapping("/{id}")
   public User getUser(@PathVariable Long id)
   通过
   @PathVariable
   获取url上的 /2  数字就是id所需要的字段 

   

   ```
   http://localhost:8081/aaa/2
   ```

3. @GetMapping("/blogs")
   public Result blogs(Integer currentPage) 

通过 

```
/blogs?currentPage=12
```



获取对应的字段
多个用&拼接

### post

1.
数据 在body中

@PostMapping("/blog/edit")

public Result edit(@Validated @RequestBody Blog blog)
用 @RequestBody来接收
let params={
......
}
 this.$axios
        .post(url, params）....
2.复杂 接收数组对象
let params={id:12,savefiles:["1","2","3",....]}
 this.$axios
        .post(url, params）....

@PostMapping("/receivefilehas")
public Result receivefilehas(@RequestBody HashMap<String, Object> map)
// 接收List
List<Savefile> savefiledata = (List<Savefile>) map.get("savefiles");
// 接收另外一个参数
Integer id = (Integer) map.get("id");
3.数组
let params=[{Id=null, sn=null, orderId=55,},{Id=null, sn=null, orderId=55,}]
 this.$axios
        .post(url, params）....
@PostMapping("/receivefile")
public Result receivefile(@RequestBody List<Savefile> savefiles)

```
4、
@PostMapping("/user/pass")
    public Result userpass(@RequestParam Integer id,@RequestParam String password,@RequestParam String newpassword) {
//   
模仿get请求  将参数拼接到URL后面
  let url = `/user/pass?id=${+this.formData.id}&newpassword=${this.passwordForm.checkPass}&password=${this.passwordForm.oldpass}`;
```

3 z
get /delete  格式相同
put/post  格式相同

## 批量插入

1.

```java
 /**
     * [java.util.HashMap<java.lang.String,java.lang.Object>]
     *
     * @return com.example.common.lang.Result
     * @author Tu
     * @date 2021/3/31 15:06
     * @message 循环插入数据库 第一种
     * 在接收前端数据是  只传入 {id:12,savefiles:["1","2","3",....]}
     * 此时后端接收  @RequestBody HashMap<String,Object> map
     * 接受一个List类型和Integer类型参数
     * 然后 获取数据
     * // 接收List
     * List<Savefile> savefiledata = (List<Savefile>) map.get("savefiles");
     * // 接收另外一个参数
     * Integer id = (Integer) map.get("id");
     * 在循环插入时候 一个错误 就是将新建的对象放在循环外
     * 正确的做法是放在循环内 让她每次循环创建新的对象 而不是只更改一条数据
     */

    @PostMapping("/tyreceivefilehas")
//    public Result receivefilehas( @RequestParam(value = "id",required = false) Integer id, @RequestParam(value = "savefiles",required = false) List<String> savefiles) {
    public Result tyreceivefilehas(@RequestBody HashMap<String, Object> map) {
        // 接收List
        List<Tylist> savefiledata = (List<Tylist>) map.get("savefiles");
        // 接收另外一个参数
        Integer id = (Integer) map.get("id");
        List<Tylist> savefiles = new ArrayList<>(savefiledata);
        for (int i = 0; i < savefiledata.size(); i++) {

            Tylist savefile = new Tylist();
            savefile.setOrderId(id);
            savefile.setDeviceid(String.valueOf(savefiledata.get(i)));
            BeanUtil.copyProperties(savefiledata.get(i), savefile, "order_id", "deviceid");
//            System.out.println(savefile);
            tylistService.saveOrUpdate(savefile);
        }
        return Result.succ("插入成功！");
    }
```

2、

```java
/**
 * [java.util.List<com.example.entity.Savefile>]
 *
 * @return com.example.common.lang.Result
 * @author Tu
 * @date 2021/3/31 15:13
 * @message 第二种 接收一个list 数据
 * 前端传入数据 [{Id=null, sn=null, orderId=55,},{Id=null, sn=null, orderId=55,}] 每条中的数据与新建的数据结构相似
 * List<Savefile> savefileList = new ArrayList<>(savefiles);
 * 拿到数据进行巴拉巴拉..
 */
  @PostMapping("/tyreceivefile")
    public Result tyreceivefile(@RequestBody List<Tylist> savefiles) {
        if (savefiles.size() == 0 || savefiles == null) {
            return Result.fail("插入数据为空！");
        }
        Tylist savefile = new Tylist();

        List<Tylist> savefileList = new ArrayList<>(savefiles);
        /**
         * 第一种时间长
         * 1000/1min
         * 1000每次
         */
//        for (int i = 0; i < savefileList.size(); i++) {
//            BeanUtil.copyProperties((savefiles.get(i)), savefile);
//            tylistService.saveOrUpdate(savefile);
//        }
        /**
         * 第二种时间明显减少
         * 1000/78ms
         * 1000每次
         */
       tylistService.saveBatch(savefileList);
        return Result.succ("插入成功！", savefile);
    }
```

## 通常 后端与数据库交互 增删改查

1、jdk1.8 版本

```java
比如
    get请求
    获取分页内容
    
@GetMapping("/TYlist")
    public Result xiaojlist(Integer currentPage) {
        if (currentPage == null || currentPage < 1) {
            currentPage = 1;
        }
    //获取区间范围内的数据
        Page page = new Page(currentPage, 100);
    //可以根据条件去查询 
        QueryWrapper<TuYList> queryWrapper = new QueryWrapper<>();
    //可以试多条件
        queryWrapper.orderByDesc("test_datetime");
    //返回数据内容 总数 总条数  当前页数（currentPage） 一页的大小（100） 数据内容（records）
        IPage pageData = tuYListService.page(page, queryWrapper);
        return Result.succ("操作成功！", pageData);
    }
get查询内容 放回响应的内容
    @GetMapping("getlistnumber")
    public Result getlistnumber(String orderNumber) {
//条件构造器
        QueryWrapper<OrderList> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("order_number", orderNumber);
    //返回符合条件的list
        List<OrderList> files = orderService.list(queryWrapper);
        //判断数据是否为空
        if (files == null || files.size() == 0) {
            return Result.fail("没有数据！");
        }
        return Result.succ("查询成功！", files);
    }
```

2、jdk1.7版本1

```java
分页查询
开始 mybatisplus3.x jdk1.8  条件构造器 QueryWrapper
mybatisplus2.x jdk1.7  条件构造器 EntityWrapper

使用SQL语句来查询
@GetMapping("/order")
    public Result order(Integer currentPage) {
        if (currentPage == null || currentPage < 1) {
            currentPage = 1;
        }
    //定义一页的数量
        Integer pagerow = 8;
    //分页方法
        PageList pageList = new PageList();
    //在impl中写方法 SQL语句等
        List<TbOrder> data = orderService.findAllbyPage(currentPage, pagerow);
        int TotalRows = orderService.countAll();
        pageList.setPage(currentPage);
        pageList.setSize(pagerow);
        pageList.setTotal(TotalRows);
        int pages = 0;
        if (TotalRows % pagerow == 0) {
            pages = TotalRows / pagerow;
        } else {
            pages = TotalRows / pagerow + 1;
        }
        pageList.setPages(pages);

        pageList.setRecords(data);
        return Result.succ("成功", pageList);
    }
    
//分页方法
        PageList
    public class PageList {
    //当前页
    private int page;
    //总行数total
    private int total;
    //总页数
    private int pages;
    //单页总数
    private int size;
    //数据列表
    private List records = new ArrayList();

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public int getPagesize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public List getList() {
        if (records == null) {
            records = new ArrayList();
        }
        return records;
    }

    public void setRecords(List records) {
        this.records = records;
    }

    public int getTotalRows() {
        return total;
    }

    public void setTotal (int total) {
        this.total = total;
    }
}
//SQL语句查询
impl
    使用 JdbcTemplate
     @Resource
    private JdbcTemplate jdbcTemplate;
    @Override
    public List<TbOrder> findAllbyPage(Integer currentPage, Integer pagerow) {
        int starter = (currentPage - 1) * pagerow;
        String sql = "select * from tb_order  limit " + starter + " , " + pagerow;
        List<TbOrder> list = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TbOrder.class));

        return list;
    }
```

2、jdk1.7版本2

```java
 同样是获取分页数据查询 可查询

@GetMapping("/getlists")
    public Result getlists(Integer currentPage) {
        if (currentPage == null || currentPage < 1) {
            currentPage = 1;
        }
        Integer rows = 100;
     //这里只能获取固定区间内的数据 比如第一页1000条数据 一次类推  并不理想 还没有上一条的好   所以果断放弃
        List<TbDeviceListRe705> devLists = tbDeviceListRe705Mapper.selectPage(new Page<TbDeviceListRe705>(1, 1000), new EntityWrapper<TbDeviceListRe705>());
     //第二种是可以的 OK
        //传递Page对象 之后可以动态的获取所有的分页数据
        Page iPage = new Page<>(currentPage, rows);
        EntityWrapper<TbDeviceListRe705> queryWrapper = new EntityWrapper<TbDeviceListRe705>();
  //降序排列  条件语句
        queryWrapper.orderBy("id", true);
//        iPage =tbDeviceListRe705Mapper.selectPage(iPage, queryWrapper);
     //这里和jdk1.8 获取查询分页的内容一样
     ////返回数据内容 总数 总条数  当前页数（currentPage） 一页的大小（100） 数据内容（records）
      // 跟这一条是一样的结果  IPage pageData = tuYListService.page(page, queryWrapper);
     //在 Service 中的方法 还有很多
     //Mapper 中方法 也是还有很多的  慢慢研究吧
          iPage = tbDeviceListRe705Service.selectPage(iPage, queryWrapper);
        //1.获取记录总数
        int total = iPage.getTotal();
      System.out.println(total);
        List<TbDeviceListRe705> lists=iPage.getRecords();
       
         return Result.succ("", iPage);
    }
```

