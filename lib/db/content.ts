import { prisma } from './prisma';
export async function getSiteSettings(){return prisma.siteSettings.findFirst({}) .then(x=>x??{siteName:'DR HONEY TECH X',description:'WhatsApp Bot Development, AI, automation, websites and digital solutions.',logoUrl:null,faviconUrl:null});}
export const getHero=()=>prisma.heroContent.findFirst({});
export const getAbout=()=>prisma.aboutContent.findFirst({});
export const getBot=()=>prisma.botContent.findFirst({});
export const getServices=()=>prisma.service.findMany({where:{published:true},orderBy:{displayOrder:'asc'}});
export const getProjects=()=>prisma.project.findMany({where:{published:true},orderBy:{displayOrder:'asc'}});
export const getPromotions=()=>prisma.promotion.findMany({where:{published:true},orderBy:{displayOrder:'asc'}});
export const getSocialLinks=()=>prisma.socialLink.findMany({where:{enabled:true},orderBy:{displayOrder:'asc'}});

export const getReviews=()=>prisma.review.findMany({where:{published:true},orderBy:{createdAt:'desc'},take:30});
