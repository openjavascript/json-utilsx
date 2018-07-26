/**
 * 判断一个属性路径是否存在于 object
 * @param {Object}      data        要判断的是否存在属性值的JSON
 * @param {string}      keypath     属性路径
 * @param {string}      delimiter   属性路径的分隔符，默认: "."
 * @return {Boolean}
 * @method jsonInData
 * @example
<pre>
    console.log( jsonInData( { 'l1': { 'l2': 1 } }, 'l1.l2' ) ); //return true
    console.log( jsonInData( { 'l1': { 'l3': 1 } }, 'l1.l2' ) ) ; //return false
</pre>
 */
function jsonInData( data, keypath, delimiter = '.' ) {
    let r, tmp = data;
    keypath = keypath || [];
    typeof keypath == 'string' && ( keypath = keypath.split( delimiter ) );

    if( !( data && keypath.length ) ) return r;
    keypath.map( ( val ) => {
        r = 0;
        if( val && tmp && ( val in tmp ) ){
           tmp = tmp[val]
           r = 1;
        }
    });

    return !!r;
}
/**
 * 从一个属性路径，添加json数据
 * @param {Object}      data        要判断的是否存在属性值的JSON
 * @param {*}           val         要添加的数据
 * @param {string}      keypath     属性路径
 * @param {boolean}     appendData  如果父节点不存在是否添加父节点，默认=0(不添加)
 * @param {string}      delimiter   属性路径的分隔符，默认: "."
 * @return {Object}     data
 * @method jsonSetData
 * @example
<pre>
    let data = { "l1": {  "l2": { "k1": 1, "k2": 2 }  } };
    
    console.log( jsonSetData( data, 'val1', 'l1.l3' ) );
    console.log( jsonSetData( data, 'val1', 'l4.l5', 1 ) );
</pre>
 */
function jsonSetData( data, val, keypath, appendData = 0, delimiter = '.' ) {
    let tmp = data, ignore;
    keypath = keypath || [];
    typeof keypath == 'string' && ( keypath = keypath.split( delimiter ) );

    if( !( data && keypath.length ) ) return tmp;
    keypath.slice( 0, -1 ).map( ( val ) => {
        if( val && tmp && ( val in tmp ) ){
           tmp = tmp[val]
        }else{
          if( appendData ){
            tmp[val] = {};
            tmp = tmp[val];
          }else{
                ignore = 1;
          }
        }
    });
    if( !ignore && tmp && keypath && keypath.length ){ 
       tmp[ keypath.slice( -1 ) ] = val;
    }

    return data;
}
/**
 * 从一个属性路径，删除json的属性
 * @param {Object}      data        要判断的是否存在属性值的JSON
 * @param {string}      keypath     属性路径
 * @param {string}      delimiter   属性路径的分隔符，默认: "."
 * @return {Object}     data
 * @method jsonInData
 * @example
<pre>
    let data = { "l1": {  "l2": { "k1": 1, "k2": 2 }  } };
    console.log( jsonDelData( data, 'l1.l2.k1') ); //  { "l1": {  "l2": { "k2": 2 }  } }
    console.log( jsonDelData( data, 'l1.l2.k3') ); //  { "l1": {  "l2": { "k2": 2 }  } }
</pre>
 */
function jsonDelData( data, keypath, delimiter = '.' ) {
    let tmp = data;
    keypath = keypath || [];
    typeof keypath == 'string' && ( keypath = keypath.split( delimiter ) );

    if( !( data && keypath.length ) ) return tmp;
    keypath.slice( 0, -1 ).map( ( val ) => {
        if( val && tmp && ( val in tmp ) ){
           tmp = tmp[val]
        }
    });
    if( tmp && keypath && keypath.length ){ 
       delete tmp[ keypath.slice( -1 ) ];
    }

    return data;
}
/**
 * 判断一个object是否空对象(没有任何属性值)
 * @param {Object}      obj     要判断的obejct
 * @return {boolean}
 * @method isEmpty
 */
function isEmpty(obj) {
   for (var x in obj) { if (obj.hasOwnProperty(x))  return false; }
   return true;
}


export jsonDelData;

