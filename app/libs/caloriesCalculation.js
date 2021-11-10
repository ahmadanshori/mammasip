export default data => {
  let totalSeninPagi = 0;
  let totalSeninSiang = 0;
  let totalSeninMalam = 0;
  let totalSelasaPagi = 0;
  let totalSelasaSiang = 0;
  let totalSelasaMalam = 0;
  let totalRabuPagi = 0;
  let totalRabuSiang = 0;
  let totalRabuMalam = 0;
  let totalKamisPagi = 0;
  let totalKamisSiang = 0;
  let totalKamisMalam = 0;
  let totalJumatPagi = 0;
  let totalJumatSiang = 0;
  let totalJumatMalam = 0;
  let totalSabtuPagi = 0;
  let totalSabtuSiang = 0;
  let totalSabtuMalam = 0;
  let totalMingguPagi = 0;
  let totalMingguSiang = 0;
  let totalMingguMalam = 0;
  // SENIN
  for (let field in data.hariSenin.makanPagi) {
    for (let item in data.hariSenin.makanPagi[field].bahan) {
      totalSeninPagi += data.hariSenin.makanPagi[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariSenin.selinganPagi) {
    for (let item in data.hariSenin.selinganPagi[field].bahan) {
      totalSeninPagi += data.hariSenin.selinganPagi[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariSenin.makanSiang) {
    for (let item in data.hariSenin.makanSiang[field].bahan) {
      totalSeninSiang += data.hariSenin.makanSiang[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariSenin.selinganSiang) {
    for (let item in data.hariSenin.selinganSiang[field].bahan) {
      totalSeninSiang += data.hariSenin.selinganSiang[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariSenin.makanMalam) {
    for (let item in data.hariSenin.makanMalam[field].bahan) {
      totalSeninMalam += data.hariSenin.makanMalam[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariSenin.selinganMalam) {
    for (let item in data.hariSenin.selinganMalam[field].bahan) {
      totalSeninMalam += data.hariSenin.selinganMalam[field].bahan[item].kkal;
    }
  }
  // SELASA
  for (let field in data.hariSelasa.makanPagi) {
    for (let item in data.hariSelasa.makanPagi[field].bahan) {
      totalSelasaPagi += data.hariSelasa.makanPagi[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariSelasa.selinganPagi) {
    for (let item in data.hariSelasa.selinganPagi[field].bahan) {
      totalSelasaPagi += data.hariSelasa.selinganPagi[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariSelasa.makanSiang) {
    for (let item in data.hariSelasa.makanSiang[field].bahan) {
      totalSelasaSiang += data.hariSelasa.makanSiang[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariSelasa.selinganSiang) {
    for (let item in data.hariSelasa.selinganSiang[field].bahan) {
      totalSelasaSiang += data.hariSelasa.selinganSiang[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariSelasa.makanMalam) {
    for (let item in data.hariSelasa.makanMalam[field].bahan) {
      totalSelasaMalam += data.hariSelasa.makanMalam[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariSelasa.selinganMalam) {
    for (let item in data.hariSelasa.selinganMalam[field].bahan) {
      totalSelasaMalam += data.hariSelasa.selinganMalam[field].bahan[item].kkal;
    }
  }
  // RABU
  for (let field in data.hariRabu.makanPagi) {
    for (let item in data.hariRabu.makanPagi[field].bahan) {
      totalRabuPagi += data.hariRabu.makanPagi[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariRabu.selinganPagi) {
    for (let item in data.hariRabu.selinganPagi[field].bahan) {
      totalRabuPagi += data.hariRabu.selinganPagi[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariRabu.makanSiang) {
    for (let item in data.hariRabu.makanSiang[field].bahan) {
      totalRabuSiang += data.hariRabu.makanSiang[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariRabu.selinganSiang) {
    for (let item in data.hariRabu.selinganSiang[field].bahan) {
      totalRabuSiang += data.hariRabu.selinganSiang[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariRabu.makanMalam) {
    for (let item in data.hariRabu.makanMalam[field].bahan) {
      totalRabuMalam += data.hariRabu.makanMalam[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariRabu.selinganMalam) {
    for (let item in data.hariRabu.selinganMalam[field].bahan) {
      totalRabuMalam += data.hariRabu.selinganMalam[field].bahan[item].kkal;
    }
  }
  // KAMIS
  for (let field in data.hariKamis.makanPagi) {
    for (let item in data.hariKamis.makanPagi[field].bahan) {
      totalKamisPagi += data.hariKamis.makanPagi[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariKamis.selinganPagi) {
    for (let item in data.hariKamis.selinganPagi[field].bahan) {
      totalKamisPagi += data.hariKamis.selinganPagi[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariKamis.makanSiang) {
    for (let item in data.hariKamis.makanSiang[field].bahan) {
      totalKamisSiang += data.hariKamis.makanSiang[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariKamis.selinganSiang) {
    for (let item in data.hariKamis.selinganSiang[field].bahan) {
      totalKamisSiang += data.hariKamis.selinganSiang[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariKamis.makanMalam) {
    for (let item in data.hariKamis.makanMalam[field].bahan) {
      totalKamisMalam += data.hariKamis.makanMalam[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariKamis.selinganMalam) {
    for (let item in data.hariKamis.selinganMalam[field].bahan) {
      totalKamisMalam += data.hariKamis.selinganMalam[field].bahan[item].kkal;
    }
  }
  // JUMAT
  for (let field in data.hariJumat.makanPagi) {
    for (let item in data.hariJumat.makanPagi[field].bahan) {
      totalJumatPagi += data.hariJumat.makanPagi[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariJumat.selinganPagi) {
    for (let item in data.hariJumat.selinganPagi[field].bahan) {
      totalJumatPagi += data.hariJumat.selinganPagi[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariJumat.makanSiang) {
    for (let item in data.hariJumat.makanSiang[field].bahan) {
      totalJumatSiang += data.hariJumat.makanSiang[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariJumat.selinganSiang) {
    for (let item in data.hariJumat.selinganSiang[field].bahan) {
      totalJumatSiang += data.hariJumat.selinganSiang[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariJumat.makanMalam) {
    for (let item in data.hariJumat.makanMalam[field].bahan) {
      totalJumatMalam += data.hariJumat.makanMalam[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariJumat.selinganMalam) {
    for (let item in data.hariJumat.selinganMalam[field].bahan) {
      totalJumatMalam += data.hariJumat.selinganMalam[field].bahan[item].kkal;
    }
  }
  // SABTU
  for (let field in data.hariSabtu.makanPagi) {
    for (let item in data.hariSabtu.makanPagi[field].bahan) {
      totalSabtuPagi += data.hariSabtu.makanPagi[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariSabtu.selinganPagi) {
    for (let item in data.hariSabtu.selinganPagi[field].bahan) {
      totalSabtuPagi += data.hariSabtu.selinganPagi[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariSabtu.makanSiang) {
    for (let item in data.hariSabtu.makanSiang[field].bahan) {
      totalSabtuSiang += data.hariSabtu.makanSiang[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariSabtu.selinganSiang) {
    for (let item in data.hariSabtu.selinganSiang[field].bahan) {
      totalSabtuSiang += data.hariSabtu.selinganSiang[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariSabtu.makanMalam) {
    for (let item in data.hariSabtu.makanMalam[field].bahan) {
      totalSabtuMalam += data.hariSabtu.makanMalam[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariSabtu.selinganMalam) {
    for (let item in data.hariSabtu.selinganMalam[field].bahan) {
      totalSabtuMalam += data.hariSabtu.selinganMalam[field].bahan[item].kkal;
    }
  }
  // MINGGU
  for (let field in data.hariMinggu.makanPagi) {
    for (let item in data.hariMinggu.makanPagi[field].bahan) {
      totalMingguPagi += data.hariMinggu.makanPagi[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariMinggu.selinganPagi) {
    for (let item in data.hariMinggu.selinganPagi[field].bahan) {
      totalMingguPagi += data.hariMinggu.selinganPagi[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariMinggu.makanSiang) {
    for (let item in data.hariMinggu.makanSiang[field].bahan) {
      totalMingguSiang += data.hariMinggu.makanSiang[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariMinggu.selinganSiang) {
    for (let item in data.hariMinggu.selinganSiang[field].bahan) {
      totalMingguSiang += data.hariMinggu.selinganSiang[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariMinggu.makanMalam) {
    for (let item in data.hariMinggu.makanMalam[field].bahan) {
      totalMingguMalam += data.hariMinggu.makanMalam[field].bahan[item].kkal;
    }
  }
  for (let field in data.hariMinggu.selinganMalam) {
    for (let item in data.hariMinggu.selinganMalam[field].bahan) {
      totalMingguMalam += data.hariMinggu.selinganMalam[field].bahan[item].kkal;
    }
  }
  let newData = {
    ...data,
    hariSenin: {
      ...data.hariSenin,
      totalKkal: {
        pagi: totalSeninPagi,
        siang: totalSeninSiang,
        malam: totalSeninMalam,
      },
    },
    hariSelasa: {
      ...data.hariSelasa,
      totalKkal: {
        pagi: totalSelasaPagi,
        siang: totalSelasaSiang,
        malam: totalSelasaMalam,
      },
    },
    hariRabu: {
      ...data.hariRabu,
      totalKkal: {
        pagi: totalRabuPagi,
        siang: totalRabuSiang,
        malam: totalRabuMalam,
      },
    },
    hariKamis: {
      ...data.hariKamis,
      totalKkal: {
        pagi: totalKamisPagi,
        siang: totalKamisSiang,
        malam: totalKamisMalam,
      },
    },
    hariJumat: {
      ...data.hariJumat,
      totalKkal: {
        pagi: totalJumatPagi,
        siang: totalJumatSiang,
        malam: totalJumatMalam,
      },
    },
    hariSabtu: {
      ...data.hariSabtu,
      totalKkal: {
        pagi: totalSabtuPagi,
        siang: totalSabtuSiang,
        malam: totalSabtuMalam,
      },
    },
    hariMinggu: {
      ...data.hariMinggu,
      totalKkal: {
        pagi: totalMingguPagi,
        siang: totalMingguSiang,
        malam: totalMingguMalam,
      },
    },
  };
  return newData;
};
