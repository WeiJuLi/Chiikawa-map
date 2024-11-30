// add stores info into firestore database by batch 
// we could also add those data manully on firebase website
import { firestore } from './firebase';
import { collection, doc, writeBatch} from 'firebase/firestore'; // Import necessary Firestore methods

// async : 定義異步函數（asynchronous function）並允許你在函數內部使用 await 關鍵字來等待其他 Promise 的完成。
// check hackMD for explanation 
const addStores = async () => {


    const stores = [
      {
        name_chinese: "大和風範",
        name_en: "Jpcon",
        country: "Taiwan",
        region: "North",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1867602.4922719335!2d119.55751747499998!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a581563f1a47%3A0xe39a9cf49fff96c5!2z5aSn5ZKM6aKo56-E!5e0!3m2!1szh-TW!2stw!4v1730371719755!5m2!1szh-TW!2stw" 
      },
      {
        name_chinese: "卡通園cartoonyuen",
        name_en: "Cartoonyuen",
        country: "Taiwan",
        region: "North",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735204.984543867!2d118.2391581!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a99252cb4077%3A0xe58eabb9785c7d59!2z5Y2h6YCa5ZySY2FydG9vbnl1ZW4!5e0!3m2!1szh-TW!2stw!4v1730372622190!5m2!1szh-TW!2stw", // 替換為真實連結
      },
      {
        name_chinese: "HOT DOG TOYZ",
        name_en: "HOT DOG TOYZ",
        country: "Taiwan",
        region: "North",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735204.984543867!2d118.2391581!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abc53cb15045%3A0xdd49f24ad76c1acd!2sHOT%20DOG%20TOYZ!5e0!3m2!1szh-TW!2stw!4v1730372755552!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "SUGOI潮流專賣店",
        name_en: "SUGOI",
        country: "Taiwan",
        region: "North",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735204.984543867!2d118.2391581!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a90ede7d0ba7%3A0x88596c092ef18dd3!2zU1VHT0nmva7mtYHlsIjos6Plupc!5e0!3m2!1szh-TW!2stw!4v1730372792283!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "一抽入魂台北車站店",
        name_en: "Gone into the soul",
        country: "Taiwan",
        region: "North",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735204.984543867!2d118.2391581!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9003b60eb9b%3A0xd2b67ccf51f594a5!2z5LiA5oq95YWl6a2C5Y-w5YyX6LuK56uZ5bqX!5e0!3m2!1szh-TW!2stw!4v1730372874012!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "一抽入魂西門萬年店",
        name_en: "Gone into the soul",
        country: "Taiwan",
        region: "North",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735204.984543867!2d118.2391581!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a900400c3b29%3A0x9111804ca983efbc!2z5LiA5oq95YWl6a2C6KW_6ZaA6JCs5bm05bqX!5e0!3m2!1szh-TW!2stw!4v1730372913851!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "Maido雑貨屋",
        name_en: "Maido",
        country: "Taiwan",
        region: "North",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735204.984543867!2d118.2391581!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468039a5cd4b2ed%3A0xacf9b2d7e1857647!2zTWFpZG_pm5HosqjlsYs!5e0!3m2!1szh-TW!2stw!4v1730372945752!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "基隆金證N北車店",
        name_en: "Keelung Gold",
        country: "Taiwan",
        region: "North",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735204.984543867!2d118.2391581!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a91de2968cd7%3A0xf9fb56710ed2be62!2z5Z-66ZqG6YeR6K2JTuWMl-i7iuW6lw!5e0!3m2!1szh-TW!2stw!4v1730372986637!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "sunsetgoods 日落小物玩具店",
        name_en: "Sunsetgoods",
        country: "Taiwan",
        region: "North",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735204.984543867!2d118.2391581!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346819a0ad901ed7%3A0x34ae6a360d7f9bb5!2zc3Vuc2V0Z29vZHMg5pel6JC95bCP54mp546p5YW35bqX772c6KCf562G5bCP5paw5bCI6LOj!5e0!3m2!1szh-TW!2stw!4v1730373051792!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "玩笑小賣所",
        name_en: "Joodan Toy",
        country: "Taiwan",
        region: "North",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735204.984543867!2d118.2391581!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346823ef85cd031f%3A0xe86f07b921a97222!2z546p56yR5bCP6LOj5omA772cSm9vZGFuIFRveQ!5e0!3m2!1szh-TW!2stw!4v1730373176862!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "Bochacha 寶加加玩具",
        name_en: "Bochacha",
        country: "Taiwan",
        region: "North",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735204.984543867!2d118.2391581!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34682300189ffc13%3A0x687e607bd66acc9d!2zQm9jaGFjaGEg5a-25Yqg5Yqg546p5YW3!5e0!3m2!1szh-TW!2stw!4v1730373211804!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "蛋要酷GachaCool",
        name_en: "GachaCool",
        country: "Taiwan",
        region: "Central",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735204.984543867!2d118.2391581!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d662c90c627%3A0x9b56934c6409582e!2z6JuL6KaB6YW3R2FjaGFDb29s!5e0!3m2!1szh-TW!2stw!4v1730373255889!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "小老闆玩具",
        name_en: "Little boss toys",
        country: "Taiwan",
        region: "Central",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735204.984543867!2d118.2391581!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d006660d36f%3A0xce2bb5b47be501bd!2z5bCP6ICB6ZeG546p5YW3!5e0!3m2!1szh-TW!2stw!4v1730373308031!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "艾德雜貨",
        name_en: "iDER ZAKKA",
        country: "Taiwan",
        region: "Central",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735204.984543867!2d118.2391581!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d02f477a707%3A0x4b4f6dc21e231c3d!2zaURFUiBaQUtLQSDoib7lvrfpm5zosqgt6KeS6JC955Sf54mp44CB5ZCJ5LyK5Y2h5ZOH44CB5Y2h5aic6LWr5ouJ44CB5ouJ5ouJ54aK44CB56au54mp5bCI6LOj!5e0!3m2!1szh-TW!2stw!4v1730373356303!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "扭蛋將軍 x 轉蛋概念館",
        name_en: "Gasgasyougun",
        country: "Taiwan",
        region: "South",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735204.984543867!2d118.2391581!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e77e988364975%3A0xe4e5b5cb07c9f32c!2z5omt6JuL5bCH6LuNIHgg6L2J6JuL5qaC5b-16aSoIOaXl-iJpuW6lw!5e0!3m2!1szh-TW!2stw!4v1730373479650!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "HQ TOYS 扭蛋玩具店",
        name_en: "HQ TOYS",
        country: "Taiwan",
        region: "South",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735204.984543867!2d118.2391581!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e75313c1e336b%3A0xd1c1100fe289e2ee!2zSFEgVE9ZUyDmia3om4vnjqnlhbflupcoMTAvMjItMzDlk6Hlt6Xml4XpgYrlupfkvJHvvIk!5e0!3m2!1szh-TW!2stw!4v1730373520831!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "氣球與鳥",
        name_en: "Ballon and bird",
        country: "Taiwan",
        region: "South",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735204.984543867!2d118.2391581!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e771ab3c08469%3A0xc78359ae94118593!2z5rCj55CD6IiH6bOl!5e0!3m2!1szh-TW!2stw!4v1730373603097!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "高雄駅一番街|墨凡",
        name_en: "Mofan",
        country: "Taiwan",
        region: "South",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735204.984543867!2d118.2391581!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e059e8c3bea77%3A0x8653c255ea9efce5!2z6auY6ZuE6aeF5LiA55Wq6KGXfOWiqOWHoeaNt-mBi-mrmOmbhOi7iuermeWVhuWgtA!5e0!3m2!1szh-TW!2stw!4v1730373677208!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "莫妮日式精品",
        name_en: "Morning's World",
        country: "Taiwan",
        region: "South",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735204.984543867!2d118.2391581!3d23.901632655456957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e0480bd9ed7f1%3A0x637a7caf27901564!2z6I6r5aau5pel5byP57K-5ZOBIG1vcm5pbmcncyB3b3JsZPCfj6HvvZzpgLHlm5vlhazkvJE!5e0!3m2!1szh-TW!2stw!4v1730373726010!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "Kiddy land 大阪梅田店",
        name_en: "Kiddy land Osaka Umeda",
        country: "Japan",
        region: "Kansai",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13119.85952585085!2d135.4882746629503!3d34.70606570677835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e7a10713013b%3A0x39c80fce680ce082!2z44Gh44GE44GL44KP44KJ44KT44GpIOWkp-mYquaiheeUsOW6lw!5e0!3m2!1szh-TW!2stw!4v1730374069006!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "Kiddy land 原宿店",
        name_en: "Kiddy land Shibuya",
        country: "Japan",
        region: "Kanto",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12965.517157893784!2d139.69618396351453!3d35.66766169404045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d0000e8001b%3A0x3016206fc7361a15!2z44Gh44GE44GL44KP44KJ44KT44GpIOWOn-Wuv-W6lw!5e0!3m2!1szh-TW!2stw!4v1730374424503!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "Kiddy land 福岡店",
        name_en: "Kiddy land Fukuoka",
        country: "Japan",
        region: "Other",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13294.20320877287!2d130.38809425785198!3d33.59101047334266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3541918e52fe5485%3A0x3a8133374a417b05!2z5aSp56WeS3lhcmHlhazlnJJLaWRkeUxhbmQg56aP5bKhUGFyY2_lupc!5e0!3m2!1szh-TW!2stw!4v1730384326649!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "Kiddy land 京都四条河原町店",
        name_en: "Kiddy land Kyoto Shijo Kawaramachi",
        country: "Japan",
        region: "Kansai",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13072.295141622908!2d135.75881536312394!3d35.00485804115205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60010963a4265897%3A0x6e9627171e33c9fb!2sChiikawa%20Land%20Kyoto%20Shijo%20Kawaramachi!5e0!3m2!1szh-TW!2stw!4v1730380789852!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "Chiikawa Land 東京車站",
        name_en: "Chiikawa Land TOKYO Station",
        country: "Japan",
        region: "Kanto",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12963.129959806878!2d139.75825476352327!3d35.68235739075485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b5dc30e7fb9%3A0x189bfb361bc033ab!2sChiikawa%20Land%20TOKYO%20Station!5e0!3m2!1szh-TW!2stw!4v1730380859632!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "Chiikawa Land 東京晴空街道店",
        name_en: "Chiikawa Land TOKYO Solamachi",
        country: "Japan",
        region: "Kanto",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12958.56795822762!2d139.8027001635399!3d35.71042668447635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188fc84fe7ed77%3A0x4184d5eec9bca4a4!2z44Gh44GE44GL44KP44KJ44KT44GpIOadseS6rOOCueOCq-OCpOODhOODquODvOOCv-OCpuODs-ODu-OCveODqeODnuODgeW6lw!5e0!3m2!1szh-TW!2stw!4v1730380987829!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "Chiikawa Land 名古屋店",
        name_en: "Chiikawa Land Nagoya PARCO",
        country: "Japan",
        region: "Kansai",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13046.87197916549!2d136.8978086632169!3d35.16365320609916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600371d683b09951%3A0xf4307115bd118812!2sChiikawa%20Land%20Nagoya%20PARCO!5e0!3m2!1szh-TW!2stw!4v1730381072047!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "Chiikawa Land 仙台店",
        name_en: "Chiikawa Land Sendai PARCO",
        country: "Japan",
        region: "Kanto",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12531.040942147696!2d140.871222365112!3d38.26186649827071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f8a29f2ad919fab%3A0x98a985bd14a04f36!2z44Gh44GE44GL44KP44KJ44KT44GpIOS7meWPsOODkeODq-OCs-W6lw!5e0!3m2!1szh-TW!2stw!4v1730381333134!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "Chiikawa Land 札幌店",
        name_en: "Chiikawa Land Sapporo PARCO",
        country: "Japan",
        region: "Other",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11660.703465810999!2d141.34286756834607!3d43.05876861638556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b2996d42e9fad%3A0x3ad4311d6fe009f4!2z44Gh44GE44GL44KP44KJ44KT44GpIOacreW5jOODkeODq-OCs-W6lw!5e0!3m2!1szh-TW!2stw!4v1730381418004!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "Chiikawa Land 橫濱店",
        name_en: "Chiikawa Land Marui City Yokohama",
        country: "Japan",
        region: "Kanto",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12998.387192321667!2d139.61437346339417!3d35.46477523929563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185d3cf21e809b%3A0xdc12cd268abbff8a!2sCHIIKAWA%20LAND%20Marui%20City%20Yokohama!5e0!3m2!1szh-TW!2stw!4v1730381502192!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "Chiikawa Land 廣島店",
        name_en: "Chiikawa Land Hiroshima PARCO",
        country: "Japan",
        region: "Other",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13169.447395732037!2d132.45165126276942!3d34.39214757526079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x355aa3f7290128b9%3A0xbdd739539a644d32!2z44Gh44GE44GL44KP44KJ44KT44GpIOW6g-WztlBBUkNP5bqX!5e0!3m2!1szh-TW!2stw!4v1730381576806!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "Kiddy Land 心齋橋店",
        name_en: "Kiddy Land Hiroshima PARCO",
        country: "Japan",
        region: "Kansai",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13124.95454153712!2d135.49071351293165!3d34.67392621381168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e7b40ff128a1%3A0xd7754d3a34fe8561!2sKiddy%20Land%20PARCO%20Shinsaibashi!5e0!3m2!1szh-TW!2stw!4v1730381683147!5m2!1szh-TW!2stw",
      },
      {
        name_chinese: "Chiikawa Store 心齋橋店",
        name_en: "Chiikawa Store Shinsaibashisuji PARCO",
        country: "Japan",
        region: "Kansai",
        googleMapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13124.95454153712!2d135.49071351293165!3d34.67392621381168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e7004cdfc62b%3A0x9cadd38b4ed9de66!2sChiikawa%20store%206F!5e0!3m2!1szh-TW!2stw!4v1730381770193!5m2!1szh-TW!2stw",
      }

    ];

    const batch = writeBatch(firestore); // Create a batch to write data
    stores.forEach((store) => {
        const storeRef = doc(collection(firestore, 'stores')); // Create a reference to a new document in 'stores'
        batch.set(storeRef, store); // Add the store data to the batch
      });
    
      await batch.commit(); // Commit the batch write
      console.log("Stores added successfully");

  };
  
  export default addStores; // Export the import function
