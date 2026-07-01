'use client';

import iconCross from '@/assets/decor/rules/cross.svg';
import { useLocale } from '@/i18n/useLocale';
import './RulesBan.scss';

const bans = [
  {
    title: 'Спам \n и реклама',
    text: 'Продвижение товаров, услуг, каналов и сторонних ботов в чате. Любые формы коммерческого продвижения запрещены.',
  },
  {
    title: 'Призывы \n к насилию',
    text: 'Угрозы, призывы к насилию или терроризму, сбор средств для подобных целей и поддержка таких действий.',
  },
  {
    title: 'Любой контент \n с лицами не достигших 18 лет',
    text: 'Категорически запрещен любой контент с участием людей младше 18 лет, в любой форме и контексте.',
  },
  {
    title: 'Сексуальный контент без согласия',
    text: 'Материалы интимного характера, отправленные собеседнику без его явного согласия. Никаких dick-pic «на удачу».',
  },
  {
    title: 'Мошенничество \n и обман',
    text: 'Финансовые схемы, поддельные сборы, попытки выманить деньги, данные карт или личную информацию.',
  },
  {
    title: 'Чужие персональные данные',
    text: 'Имена, адреса, телефоны и фото других людей без их согласия. Это называется доксингом и преследуется законом.',
  },
  {
    title: 'Незаконные \n товары и услуги',
    text: 'Наркотики, оружие, поддельные документы и любая другая торговля, запрещенная законом большинства стран.',
  },
  {
    title: 'Оскорбления \n и травля',
    text: 'Оскорбления по полу, расе, религии, ориентации, унижения, угрозы и любое преследование собеседника.',
  },
  {
    title: 'Прямые \n ссылки t.me',
    text: 'Делиться юзернеймом (@username) и ссылками на соцсети можно. Кликабельные ссылки на Telegram-каналы — нет.',
  },
];

const enBans = [
  {
    title: 'Spam \n and ads',
    text: 'Promoting products, services, channels, bots, or third-party projects is forbidden.',
  },
  {
    title: 'Violence \n and hate',
    text: 'Threats, calls for violence, terrorism, fundraising, or support for such actions are forbidden.',
  },
  {
    title: 'Content with \n minors',
    text: 'Any content involving people under 18 is strictly forbidden in any form or context.',
  },
  {
    title: 'Sexual content \n without consent',
    text: 'Intimate content sent without clear consent is forbidden. No unsolicited pics.',
  },
  {
    title: 'Scams \n and fraud',
    text: 'Money scams, fake fundraising, card data theft, or attempts to get personal data are forbidden.',
  },
  {
    title: 'Private data \n of others',
    text: 'Do not share names, addresses, phone numbers, or photos of others without consent.',
  },
  {
    title: 'Illegal goods \n and services',
    text: 'Drugs, weapons, fake documents, or any other illegal trade are forbidden.',
  },
  {
    title: 'Insults and \n harassment',
    text: 'Insults, humiliation, threats, or harassment of your chat partner are forbidden.',
  },
  {
    title: 'Direct t.me \n links',
    text: 'Sharing usernames (@username) and social media links is permitted. Clickable links to Telegram channels are not.',
  },
];

const idBans = [
  {
    title: 'Spam \n dan iklan',
    text: 'Promosi produk, layanan, channel, bot, atau proyek pihak ketiga dilarang.',
  },
  {
    title: 'Kekerasan \n dan hate',
    text: 'Ancaman, ajakan kekerasan, terorisme, penggalangan dana, atau dukungan dilarang.',
  },
  {
    title: 'Konten dengan \n minor',
    text: 'Konten yang melibatkan orang di bawah 18 dilarang keras dalam bentuk apa pun.',
  },
  {
    title: 'Konten seksual \n tanpa izin',
    text: 'Materi intim tanpa izin jelas dilarang. Jangan kirim foto tanpa diminta.',
  },
  {
    title: 'Penipuan \n dan scam',
    text: 'Donasi palsu, skema uang, pencurian data kartu, atau data pribadi dilarang.',
  },
  {
    title: 'Data pribadi \n orang lain',
    text: 'Jangan bagikan nama, alamat, nomor telepon, atau foto orang lain tanpa izin.',
  },
  {
    title: 'Barang dan \n jasa ilegal',
    text: 'Narkoba, senjata, dokumen palsu, atau perdagangan ilegal lain dilarang.',
  },
  {
    title: 'Hinaan \n dan pelecehan',
    text: 'Hinaan, ancaman, penghinaan, atau pelecehan terhadap teman chat dilarang.',
  },
  {
    title: 'Link t.me \n langsung',
    text: 'Berbagi @username dan tautan media sosial diperbolehkan. Tautan klik ke channel Telegram tidak diperbolehkan.',
  },
];

export function RulesBan() {
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const isIndonesian = locale === 'id';
  const items = isEnglish ? enBans : isIndonesian ? idBans : bans;

  return (
    <>
      <section className="rules-ban" aria-labelledby="rules-ban-title">
        <div className="rules-ban__intro">
          <h2 id="rules-ban-title">
            {isEnglish ? 'What not to do' : isIndonesian ? 'Yang dilarang' : 'Что нельзя'}
            <br />
            {isEnglish ? 'in Chatus' : isIndonesian ? 'di Chatus' : 'делать в Chatus'}
          </h2>
          <p>
            {isEnglish
              ? 'These rules apply to everyone. They help keep chats safe and prevent conversations from turning into unpleasant experiences.'
              : isIndonesian
                ? 'Aturan ini berlaku untuk semua orang. Tujuannya agar chat tetap aman dan tidak berubah menjadi pengalaman yang tidak menyenangkan.'
              : 'Эти правила работают для всех. Они помогают сделать так, чтобы общение в чате оставалось безопасным и не превращалось во что-то неприятное.'}
          </p>
        </div>

        <div className="rules-ban__grid">
          {items.map((item) => (
            <article className="rules-ban-card" key={item.title}>
              <img src={iconCross} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rules-penalty" aria-labelledby="rules-penalty-title">
        <h2 id="rules-penalty-title">
          {isEnglish ? 'What happens if you' : isIndonesian ? 'Jika melanggar' : 'Что будет при'}
          <br />
          {isEnglish ? 'break the rules' : isIndonesian ? 'aturan' : 'нарушении'}
        </h2>
        <p>
          {isEnglish
            ? 'Breaking these rules may lead to a temporary restriction or a permanent ban from Chatus. Messages may be checked automatically and manually. If you think you were blocked by mistake, contact support and we will review the decision.'
            : isIndonesian
              ? 'Pelanggaran aturan dapat menyebabkan pembatasan sementara atau blokir permanen dari Chatus. Pesan dapat diperiksa otomatis dan manual. Jika kamu merasa diblokir karena salah, hubungi dukungan dan kami akan meninjau keputusan tersebut.'
            : 'Нарушение этих правил может привести к временному ограничению или постоянной блокировке доступа к Chatus. Все сообщения проходят автоматическую и ручную проверку. Если вы считаете, что вас заблокировали по ошибке — напишите в поддержку, мы пересмотрим решение.'}
        </p>
      </section>
    </>
  );
}
