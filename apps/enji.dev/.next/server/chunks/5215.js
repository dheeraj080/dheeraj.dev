"use strict";exports.id=5215,exports.ids=[5215],exports.modules={5215:(t,e,n)=>{n.d(e,{I0:()=>getAllContentMeta,Jv:()=>getContentActivity,Bg:()=>getContentMeta,zF:()=>getNewPosts,Ym:()=>getReactions,Bs:()=>getReactionsBy,rr:()=>getSectionMeta,aT:()=>getSharesBy,zv:()=>getViewsBy,E6:()=>setReaction,Ds:()=>setShare,kE:()=>setView});var a=n(9593),c=n.n(a),r=n(1635),s=n.n(r),o=n(4195),i=n.n(o);s().extend(i());let u=s();var y=n(3524);let l=global,w=l.prisma||new y.PrismaClient,getAllContentMeta=async()=>{let t=await w.contentMeta.findMany({include:{_count:{select:{shares:!0,views:!0}}},orderBy:{createdAt:"asc"}});return t&&t.length>0?t.reduce((t,e)=>({...t,[e.slug]:{meta:{views:e._count.views,shares:e._count.shares}}}),{}):{}},getContentMeta=async t=>{let e=await w.contentMeta.findFirst({where:{slug:t},include:{_count:{select:{shares:!0,views:!0}}}});return{shares:e?._count.shares||0,views:e?._count.views||0}},getContentActivity=async()=>{let t=u().subtract(24,"hours").toDate(),e=await w.contentMeta.findMany({include:{reactions:{select:{type:!0,count:!0,createdAt:!0,content:{select:{slug:!0,title:!0,type:!0}}},orderBy:{createdAt:"asc"},where:{createdAt:{gte:t}},take:5},shares:{select:{type:!0,createdAt:!0,content:{select:{slug:!0,title:!0,type:!0}}},orderBy:{createdAt:"asc"},where:{createdAt:{gte:t}},take:5}}}),n=`
    $sort([
      $.reactions.{
        'activityType': 'REACTION',
        'type': type,
        'count': count,
        'createdAt': createdAt,
        'slug': content.slug,
        'contentTitle': content.title,
        'contentType': content.type
      }, 
      $.shares.{
        'activityType': 'SHARE',
        'type': type,
        'createdAt': createdAt,
        'slug': content.slug,
        'contentTitle': content.title,
        'contentType': content.type
      }
    ], function($l, $r) {
      $string($l.createdAt) < $string($r.createdAt)
    })[[0..4]]
  `,a=await c()(n).evaluate(e);return a},getNewPosts=async()=>{let t=u().subtract(8,"days").toDate(),e=await w.contentMeta.findMany({where:{type:"POST",AND:{createdAt:{gte:t}}},select:{slug:!0,title:!0,createdAt:!0},orderBy:{createdAt:"desc"},take:1});return e},getReactions=async t=>{let e=await w.reaction.groupBy({by:["type"],_sum:{count:!0},where:{content:{slug:t}}}),n=`$merge([
    {
      'CLAPPING': 0,
      'THINKING': 0,
      'AMAZED': 0
    },
    $.{
      type: _sum.count
    }
  ])`,a=await c()(n).evaluate(e);return a},getSectionMeta=async t=>{let e=await w.reaction.groupBy({by:["section","type"],_sum:{count:!0},where:{section:{not:null},content:{slug:t}},orderBy:{section:"asc"}}),n=`$\
    {
      section: {
        'reactionsDetail': $merge([
          {
            'CLAPPING': 0,
            'THINKING': 0,
            'AMAZED': 0
          },
          {
            type: _sum.count
          }
        ])
      }
    }`,a=await c()(n).evaluate(e);return a},getReactionsBy=async(t,e)=>{let n=await w.reaction.groupBy({by:["type"],_sum:{count:!0},where:{sessionId:e,content:{slug:t}}}),a=`$merge([
    {
      'CLAPPING': 0,
      'THINKING': 0,
      'AMAZED': 0
    },
    $.{
      type: _sum.count
    }
  ])`,r=await c()(a).evaluate(n);return r},setReaction=async({slug:t,contentType:e,contentTitle:n,count:a,section:c,sessionId:r,type:s})=>{let o=await w.reaction.create({data:{count:a,type:s,section:c,sessionId:r,content:{connectOrCreate:{where:{slug:t},create:{slug:t,type:e,title:n}}}}});return o},getSharesBy=async(t,e)=>{let n=await w.share.count({where:{sessionId:e,content:{slug:t}}});return n||0},setShare=async({slug:t,contentType:e,contentTitle:n,type:a,sessionId:c})=>{let r=await w.share.create({data:{type:a,sessionId:c,content:{connectOrCreate:{where:{slug:t},create:{slug:t,type:e,title:n}}}}});return r},getViewsBy=async(t,e)=>{let n=await w.view.count({where:{sessionId:e,content:{slug:t}}});return n||0},setView=async({slug:t,contentType:e,contentTitle:n,sessionId:a})=>{let c=await w.view.create({data:{sessionId:a,content:{connectOrCreate:{where:{slug:t},create:{slug:t,type:e,title:n}}}}});return c}}};