module.exports = {
    // 添加用户
    ADD_USER: 'insert into userlist(uid,nick_name) values (?,?)',
    //查询此昵称是否存在
    USER_ISHAS: 'select * from userlist where nick_name=?',

    //添加分类
    ADD_CLASSIFY: 'insert into classify (c_name,c_icon,c_type,uid) values (?,?,?,?)',
    //查询此分类是否存在
    CLASSIFY_ISHAS: 'select * from classify where (uid=? or uid="*") and c_name=?',

    //添加账单
    ADD_Bill: 'insert into loginfo (lid,uid,cid,create_time,money) values (?,?,?,?,?)',
    //删除账单
    DEL_BILL: 'delete from loginfo where lid=?',
    //查询所有的账单
    ALL_BILL: 'select l.*,c.c_name,c_type,c_icon from loginfo l,classify c,userlist u where u.uid=? and l.uid=u.uid and l.uid=c.uid',
    //查询收支分类
    Type_Bill: 'select l.*,c.c_name,c_type,c_icon from loginfo l,classify c,userlist u where u.uid=? and l.uid=u.uid and l.cid=c.cid and c.c_type=?',
    //查询分类
    CLASSIFY_BILL: 'select l.*,c.c_name,c_type,c_icon from loginfo l,classify c,userlist u where u.uid=? and l.uid=u.uid and l.cid=c.cid and c.c_name=?'
}