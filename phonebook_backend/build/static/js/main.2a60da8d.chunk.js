(window.webpackJsonpphonebook=window.webpackJsonpphonebook||[]).push([[0],{14:function(e,t,n){e.exports=n(37)},19:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(0),o=n.n(r),c=n(13),i=n.n(c),u=(n(19),n(3)),l=n.n(u),s="/api/persons",m=function(){return l.a.get(s)},f=function(e){return l.a.post(s,e)},d=function(e,t){return l.a.put("".concat(s,"/").concat(e),t)},b=function(e){return l.a.delete("".concat(s,"/").concat(e))},p=function(e){var t=e.filter,n=e.setFilter;return o.a.createElement("div",null,"filter shown with ",o.a.createElement("input",{value:t,onChange:function(e){n(e.target.value)}}))},E=function(e){var t=e.notification;return null==t.message||""===t.message?null:o.a.createElement("div",{className:t.style},t.message)},h=function(e){var t=e.persons,n=e.setPersons,c=e.setNotificationMessage,i=Object(r.useState)(""),u=Object(a.a)(i,2),l=u[0],s=u[1],m=Object(r.useState)(""),b=Object(a.a)(m,2),p=b[0],E=b[1];return o.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),""!==l&&""!==p){var a={name:l,number:p},r=t.find(function(e){return e.name===a.name});r?r.name===a.name&&r.number===a.number?alert("'".concat(a.name,"' is already added to phonebook")):a.number!==r.number&&window.confirm("'".concat(r.name,"' is already added to phonebook, replace the old number with a new one?"))&&d(r.id,a).then(function(e){n(t.map(function(t){return t.id!==r.id?t:e.data}))}).catch(function(e){c({message:"'".concat(r.name,"' was already deleted from server"),style:"notification-error"})}):f(a).then(function(e){n(t.concat(e.data)),s(""),E(""),c({message:"Added "+a.name,style:"notification-ok"})}).catch(function(e){c({message:e.response.data.error,style:"notification-error"})})}else alert("The name and number need to be introduced!")}},o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:l,onChange:function(e){s(e.target.value)}}),o.a.createElement("br",null),"number: ",o.a.createElement("input",{value:p,onChange:function(e){E(e.target.value)}})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},v=function(e){var t=e.filter,n=e.persons,a=e.setPersons;return o.a.createElement("div",null,(t?n.filter(function(e){return e.name.toLocaleLowerCase().includes(t.toLowerCase())}):n).map(function(e,t){return o.a.createElement("p",{key:t},e.name," ",e.number," ",o.a.createElement("button",{key:"btn-"+t,onClick:function(){return function(e){window.confirm("Delete "+e.name+" ?")&&b(e.id).then(function(t){a(n.filter(function(t){return t.id!==e.id}))})}(e)}},"delete"))}))},g=function(){var e=Object(r.useState)([]),t=Object(a.a)(e,2),n=t[0],c=t[1],i=Object(r.useState)({message:"",style:""}),u=Object(a.a)(i,2),l=u[0],s=u[1];Object(r.useEffect)(function(){m().then(function(e){c(e.data)})},[]);var f=Object(r.useState)(""),d=Object(a.a)(f,2),b=d[0],g=d[1];return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(E,{notification:l}),o.a.createElement(p,{filter:b,setFilter:g}),o.a.createElement("h3",null,"add a new"),o.a.createElement(h,{persons:n,setPersons:c,setNotificationMessage:s}),o.a.createElement("h3",null,"Numbers"),o.a.createElement(v,{filter:b,persons:n,setPersons:c,setNotificationMessage:s}))};t.default=g;i.a.render(o.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.2a60da8d.chunk.js.map