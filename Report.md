# Report

>  IT5007: Software Engineering on Application Architecture
>
>  Tutorial-6:  Hotel California International Waitlist System Goes Mobile 
>
> Author: Hu Xuan (A0228578M)

**Git Repository Link**: https://github.com/syuan00/hotel-waitlist-system-mobile

In this tutorial, I implement the "delete" feature. 

For the back-end, it is the same with Tutorial 5 except a new query type is added. The new query is to query a customer's information by its unique serial no. 

```
query {
  customer(id:1) {
    id
    name
    phone
    timestamp
  }
}
```

For the front-end, a TextInput component is used to accept an input from the user for uniquely identifying the customer to be deleted from waitlistDB. It is also maitained as a state, so that whenever it is updated, the customer's information, which shows below through Text components, changes accordingly. 

Once you press the DELETE button and it is a valid customer, this customer's record is deleted from waitlistDB. 

![untitled](https://tva1.sinaimg.cn/large/008i3skNgy1gwg2byebxcg30u01hchdu.gif)

![image-20211115193336437](https://tva1.sinaimg.cn/large/008i3skNgy1gwg2ckqp8qj30ly07x74k.jpg)