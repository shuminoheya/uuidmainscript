    // Core variables and addresses
    h5gg.searchNumber('32400', 'I32', '0x100000000', '0x110000000');
    let base = Number(h5gg.getResults('1')[0].address);

    let nekokan = base - 0x130;               // ねこかん
    let xp = base + 0x40;                     // XP
    let np = base + 0x48;                     // NP
    let EnemyBaseOffset = base + 0x80ef4;     // 敵城
    let toku = EnemyBaseOffset + 0x3d4;       // 特殊城
    let jibOffset = base + 0x74410;           // 自城

    let gintike = base + 0x301ae4;            // 銀チケ
    let kintike = gintike + 0x8;              // 金チケ
    let puratike = base - 0x95a0;             // プラチケ
    let rejetike = puratike + 0x8;            // レジェチケ
    let item = base + 0x3df40;                // スピードアップなど

    let characterUnlockOffset = base + 0x3AA38; // 全キャラ開放
    let levelOffset = base + 0x3b750;           // レベル一括上げ
    let SkipOffset = base + 0x3034a4;           // ガチャスキップ
    let SinkaOffset = base + 0x3f0658;          // 進化スキップ
    let startOffset = base + 0x69C;             // ステージ開放

    let catsEyeOffset = base + 0x40f80c;        // キャッツアイ
    let siroOffset = base + 0x40f854;           // 城素材
    let koukokuAddr = base + 0x415b50;          // 広告削除
    let ship = base - 0x9bfe;                   // リーダーシップ
    let clearCountOffset = base + 0x6C8;        // クリア回数
    let nekobitanOffset = base + 0x40f83c;      // ネコビタン
    let takaraOffset = base + 0xEE8;            // お宝

    let glassCatOffset = base + 0x13D3F8;       // ガラスネコ
    let charOffset = base + 0x3d0d0;            // 第3形態
    let play = base + 0x389b14;                 // プレイ時間
    let baseOffset = base + 0x3de8c;            // 施設

    let legend = base + 0x312be8;
    let legend2 = base + 0x3153c8;
    let legend1 = legend2 - 0x27E0;

    let attemptsLeft = 3;
    let kazu = 837;
    let trues = 100;

    const modules = h5gg.getRangesList("battlecats");
    const dbase = Number(modules[0].start);

    function changeValue(name, addr) {
      let value = Number(prompt(name + "の数値を入力してください"));
      if (value === null) return;
      if (!isNaN(value)) {
        h5gg.setValue(addr, value, "I32");
        h5gg.setValue(addr + 4, 0, "I32");
        alert(name + "を" + value + "に変更しました");
      }
    }

    // 敵城トグル
    let enemyBaseIntervalId = null;
    function EnemyBase() {
      if (enemyBaseIntervalId === null) {
        enemyBaseIntervalId = setInterval(() => {
          h5gg.setValue(EnemyBaseOffset, 0, "I32");
          h5gg.setValue(toku, 0, "I32");
        }, 100);
      } else {
        clearInterval(enemyBaseIntervalId);
        enemyBaseIntervalId = null;
      }
    }

    // 自城トグル
    let jibBaseId = null;
    function JibBase() {
      if (jibBaseId) {
        clearInterval(jibBaseId);
        jibBaseId = null;
        return;
      }
      jibBaseId = setInterval(() => {
        let v = h5gg.getValue(jibOffset, "I32");
        if (v > 0) {
          let jisiro = h5gg.getValue(jibOffset - 4, "I32");
          h5gg.setValue(jibOffset, jisiro, "I32");
        }
      }, 100);
    }

    // キャッツアイ
    const Eye = ["キャッツアイ[EX]", "キャッツアイ[レア]", "キャッツアイ[激レア]", "キャッツアイ[超激レア]", "キャッツアイ[伝説]", "キャッツアイ[闇]"];
    function changeCatsEye() {
      let input = prompt("数値または詳細の名前を入力してください");
      if (!input) return;

      if (!isNaN(Number(input))) {
        let value = Number(input);
        for (let j = 0; j < 6; j++) {
          h5gg.setValue(catsEyeOffset + (j * 8), value, "I32");
          h5gg.setValue(catsEyeOffset + 4 + (j * 8), 0, "I32");
        }
        alert("キャッツアイの数を " + value + " に変更しました");
      } else {
        let index = Eye.indexOf(input);
        if (index === -1) return alert("ちゃんとした名前を入力してください");
        let valueStr = prompt(input + " の値を入力してください");
        if (!valueStr) return;
        let value = Number(valueStr);
        if (isNaN(value)) return alert("数字を入力してください");
        let targetAddr = catsEyeOffset + (index * 8);
        h5gg.setValue(targetAddr, value, "I32");
        h5gg.setValue(targetAddr + 4, 0, "I32");
        alert(input + " の値を " + value + " に変更しました");
      }
      h5gg.clearResults();
    }

    // ネコビタン
    const bitan = ["ネコビタンA", "ネコビタンB", "ネコビタンC"];
    function nekobitan() {
      let input = prompt("数値または詳細の名前を入力してください");
      if (!input) return;

      if (!isNaN(Number(input))) {
        const value = Number(input);
        for (let j = 0; j < 6; j++) {
          h5gg.setValue(nekobitanOffset + (j * 8), value, "I32");
          h5gg.setValue(nekobitanOffset + 4 + (j * 8), 0, "I32");
        }
        alert("ネコビタンの数を " + value + " に変更しました");
      } else {
        let index = bitan.indexOf(input);
        if (index === -1) return alert("ちゃんとした名前を入力してください");
        let valueStr = prompt(input + " の値を入力してください");
        if (!valueStr) return;
        let value = Number(valueStr);
        if (isNaN(value)) return alert("数字を入力してください");
        let targetAddr = nekobitanOffset + (index * 8);
        h5gg.setValue(targetAddr, value, "I32");
        h5gg.setValue(targetAddr + 4, 0, "I32");
        alert(input + " の値を " + value + " に変更しました");
      }
      h5gg.clearResults();
    }

    // 城素材
    const sozai = ["レンガ", "羽", "備長炭", "鋼の歯車", "黄金", "宇宙石", "謎の骨", "アンモナイト"];
    function sirozai() {
      let input = prompt("数値または詳細の名前を入力してください");
      if (!input) return;

      if (!isNaN(Number(input))) {
        const value = Number(input);
        for (let j = 0; j < 8; j++) {
          h5gg.setValue(siroOffset + (j * 8), value, "I32");
          h5gg.setValue(siroOffset + 4 + (j * 8), 0, "I32");
        }
        alert("城素材の数を " + value + " に変更しました");
      } else {
        let index = sozai.indexOf(input);
        if (index === -1) return alert("ちゃんとした名前を入力してください");
        let valueStr = prompt(input + " の値を入力してください");
        if (!valueStr) return;
        let value = Number(valueStr);
        if (isNaN(value)) return alert("数字を入力してください");
        let targetAddr = siroOffset + (index * 8);
        h5gg.setValue(targetAddr, value, "I32");
        h5gg.setValue(targetAddr + 4, 0, "I32");
        alert(input + " の値を " + value + " に変更しました");
      }
      h5gg.clearResults();
    }

    // バトルアイテム
    const ite = ["スピードアップ", "トレジャーセット", "ネコボン", "ニャンピューター", "おかめはちもく", "スニャイパー"];
    function startitem() {
      let input = prompt("数値または詳細の名前を入力してください");
      if (!input) return;

      if (!isNaN(Number(input))) {
        const value = Number(input);
        for (let j = 0; j < 6; j++) {
          h5gg.setValue(item + (j * 8), value, "I32");
          h5gg.setValue(item + 4 + (j * 8), 0, "I32");
        }
        alert("アイテムの数を " + value + " に変更しました");
      } else {
        let index = ite.indexOf(input);
        if (index === -1) return alert("ちゃんとした名前を入力してください");
        let valueStr = prompt(input + " の値を入力してください");
        if (!valueStr) return;
        let value = Number(valueStr);
        if (isNaN(value)) return alert("数字を入力してください");
        let targetAddr = item + (index * 8);
        h5gg.setValue(targetAddr, value, "I32");
        h5gg.setValue(targetAddr + 4, 0, "I32");
        alert(input + " の値を " + value + " に変更しました");
      }
      h5gg.clearResults();
    }

    // マタタビ
    const matatabi = [
      "紫マタタビの種", "赤マタタビの種", "青マタタビの種", "緑マタタビの種", "黄マタタビの種", "紫マタタビ",
      "赤マタタビ", "青マタタビ", "緑マタタビ", "黄マタタビ", "虹マタタビ", "古代マタタビの種",
      "古代マタタビ", "虹マタタビの種", "金マタタビ", "悪マタタビの種", "悪マタタビ", "金マタタビの種",
      "紫獣石", "紅獣石", "蒼獣石", "翠獣石", "黄獣石", "紫獣結晶",
      "紅獣結晶", "蒼獣結晶", "翠獣結晶", "黄獣結晶", "虹獣石"
    ];
    function matt() {
      let input = prompt("数値または詳細の名前を入力してください");
      if (!input) return;

      const addr = dbase + 0x1d398f0;
      const mattAddr = Number(h5gg.getValue(addr, "I64"));

      if (!isNaN(Number(input))) {
        const value = Number(input);
        for (let j = 0; j < 29; j++) {
          h5gg.setValue(mattAddr + 4 + (j * 8), value, "I32");
        }
        alert("マタタビの数を " + value + " に変更しました");
      } else {
        let index = matatabi.indexOf(input);
        if (index === -1) return alert("ちゃんとした名前を入力してください");
        let valueStr = prompt(input + " の値を入力してください");
        if (!valueStr) return;
        let value = Number(valueStr);
        if (isNaN(value)) return alert("数字を入力してください");
        let targetAddr = mattAddr + (index * 8);
        h5gg.setValue(targetAddr + 4, value, "I32");
        alert(input + " の値を " + value + " に変更しました");
      }
      h5gg.clearResults();
    }

    // 真レジェ解放
    function truelegend() {
      var addr = dbase + 0x1cb6b50;
      var trueOffset = h5gg.getValue(addr, "I64");
      trueOffset = Number(trueOffset);
      let trueOffset2 = trueOffset + (45 * 4);

      var addr2 = dbase + 0x1c7bdf0;
      var truekaiho = h5gg.getValue(addr2, "I64");
      truekaiho = Number(truekaiho);

      for (let i = 0; i < 4; i++) {
        h5gg.setValue(truekaiho + (i * 4), 1, "I32");
        h5gg.setValue(truekaiho + (trues - 1) * 4, 1, "I32");
      }

      for (let i = 0; i < (trues - 2) * 4; i++) {
        h5gg.setValue(truekaiho + 16 + (i * 4), 8, "I32");
      }

      for (let i = 0; i < 6; i++) {
        h5gg.setValue(trueOffset + (i * 4), 1, "I32");
      }
      for (let block = 0; block < trues; block++) {
        for (let j = 0; j < 25; j++) {
          let addr = trueOffset2 + (block * 25 + j) * 4;
          h5gg.setValue(addr, 1, "I32");
        }
      }
      alert("真レジェンドを開放しました");
    }

    // 仮ゼロレジェ解放
    const zer = [3,3,4,5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3];
    const zer2 = [6,6,4,8,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6];
    function zero() {
      var addr = dbase + 0x18f2890;
      var zeroOffset = Number(h5gg.getValue(addr, "I64"));
      let zeroOffset2 = zeroOffset + (32 * 4);

      let addr2 = dbase + 0x18a7230;
      let zeroKuri = Number(h5gg.getValue(addr2, "I64"));
      let zeroKuri2 = zeroKuri + (20 * 4);

      h5gg.setValue(zeroOffset + 0x20, 1, "I32");
      h5gg.setValue(zeroKuri + 0x10f7f8, 1, "I32");

      for (let j = 0; j < zer.length; j++) {
        for (let i = 0; i < zer[j]; i++) {
          let targetAddr = zeroOffset2 + (i * 4);
          h5gg.setValue(targetAddr + 0x20, 65537, "I32");
        }
        zeroOffset2 += 32 * 4;
      }

      for (let i = 0; i < zer2.length; i++) {
        h5gg.setValue(zeroKuri2 + 0x10f7f8, zer2[i], "I32");
        zeroKuri2 += 12 * 4;
      }
      alert("ゼロレジェを開放しました");
    }

    // 全キャラ開放 & エラー削除
    const errorDelete = [
      0x8c * 4, 0x9c * 4, 0xb7 * 4, 0x11e * 4, 0x141 * 4, 0x154 * 4, 0x162 * 4,
      0x1B1 * 4, 0x1b2 * 4, 0x1d2 * 4, 0x1f2 * 4, 0x1f3 * 4, 0x1f4 * 4, 0x1f5 * 4,
      0x2a2 * 4, 0x1ed * 4, 741 * 4, 742 * 4, 743 * 4, 744 * 4, 745 * 4, 746 * 4,
      789 * 4, 811 * 4
    ];
    function unlockAllCharacters() {
      let unlock = h5gg.getValue(characterUnlockOffset, "I32");
      let deleteValue = h5gg.getValue(characterUnlockOffset + (kazu * 4), "I32");

      if (isNaN(unlock)) {
        alert("アドレスの取得に失敗しました");
        return;
      }
      for (let i = 0; i < kazu; i++) {
        h5gg.setValue(characterUnlockOffset + (i * 4), unlock, "I32");
      }
      for (let i = 0; i < errorDelete.length; i++) {
        let errorDeleteOffset = characterUnlockOffset + errorDelete[i] - 4;
        h5gg.setValue(errorDeleteOffset, deleteValue, "I32");
      }
      alert("全キャラクターを開放しました");
    }

    // レベルMAX＋広告削除
    function level() {
      let levelkazu = kazu * 2;
      for (let i = 0; i < levelkazu; i++) {
        h5gg.setValue(levelOffset + (i * 4), 999, "I32");
      }
      h5gg.setValue(koukokuAddr, 999999, "I32");
      alert("レベルをマックスにしました");
    }

    // 第三形態＆白キャラ削除
    const numbers = [ /* long list preserved exactly as provided */ 
      28 * 4, 29 * 4, 30 * 4, 46 * 4, 54 * 4, 55 * 4, 63 * 4, 65 * 4, 66 * 4, 83 * 4,
      90 * 4, 91 * 4, 102 * 4, 103 * 4, 109 * 4, 111 * 4, 113 * 4, 114 * 4, 115 * 4,
      116 * 4, 117 * 4, 118 * 4, 119 * 4, 132 * 4, 141 * 4, 142 * 4, 143 * 4,
      156 * 4, 157 * 4, 158 * 4, 163 * 4, 164 * 4, 165 * 4, 166 * 4, 167 * 4,
      168 * 4, 176 * 4, 177 * 4, 179 * 4, 182 * 4, 183 * 4, 185 * 4, 187 * 4,
      190 * 4, 191 * 4, 193 * 4, 194 * 4, 201 * 4, 203 * 4, 205 * 4, 206 * 4,
      207 * 4, 208 * 4, 209 * 4, 215 * 4, 216 * 4, 217 * 4, 218 * 4, 219 * 4,
      220 * 4, 221 * 4, 222 * 4, 230 * 4, 231 * 4, 232 * 4, 233 * 4, 234 * 4,
      235 * 4, 236 * 4, 237 * 4, 243 * 4, 244 * 4, 245 * 4, 263 * 4, 264 * 4,
      265 * 4, 266 * 4, 267 * 4, 270 * 4, 275 * 4, 276 * 4, 278 * 4, 279 * 4,
      280 * 4, 281 * 4, 282 * 4, 286 * 4, 291 * 4, 292 * 4, 293 * 4, 294 * 4,
      295 * 4, 296 * 4, 297 * 4, 298 * 4, 299 * 4, 302 * 4, 310 * 4, 316 * 4,
      318 * 4, 319 * 4, 321 * 4, 322 * 4, 327 * 4, 328 * 4, 329 * 4, 334 * 4,
      340 * 4, 343 * 4, 344 * 4, 347 * 4, 349 * 4, 350 * 4, 351 * 4, 354 * 4,
      355 * 4, 357 * 4, 364 * 4, 365 * 4, 366 * 4, 367 * 4, 368 * 4, 369 * 4,
      372 * 4, 373 * 4, 374 * 4, 375 * 4, 376 * 4, 379 * 4, 381 * 4, 382 * 4,
      385 * 4, 387 * 4, 388 * 4, 389 * 4, 390 * 4, 399 * 4, 400 * 4, 401 * 4,
      404 * 4, 405 * 4, 407 * 4, 408 * 4, 409 * 4, 412 * 4, 413 * 4, 416 * 4,
      417 * 4, 419 * 4, 420 * 4, 421 * 4, 422 * 4, 423 * 4, 424 * 4, 425 * 4,
      426 * 4, 429 * 4, 430 * 4, 431 * 4, 433 * 4, 434 * 4, 435 * 4, 436 * 4,
      439 * 4, 442 * 4, 450 * 4, 452 * 4, 454 * 4, 455 * 4, 456 * 4, 458 * 4,
      459 * 4, 460 * 4, 461 * 4, 462 * 4, 464 * 4, 466 * 4, 467 * 4, 471 * 4,
      476 * 4, 477 * 4, 478 * 4, 479 * 4, 481 * 4, 482 * 4, 484 * 4, 485 * 4,
      486 * 4, 487 * 4, 488 * 4, 490 * 4, 491 * 4, 492 * 4, 493 * 4, 494 * 4,
      495 * 4, 498 * 4, 499 * 4, 500 * 4, 501 * 4, 502 * 4, 504 * 4, 505 * 4,
      508 * 4, 509 * 4, 510 * 4, 511 * 4, 513 * 4, 514 * 4, 515 * 4, 516 * 4,
      517 * 4, 518 * 4, 519 * 4, 521 * 4, 525 * 4, 527 * 4, 530 * 4, 531 * 4,
      536 * 4, 537 * 4, 538 * 4, 539 * 4, 541 * 4, 542 * 4, 543 * 4, 544 * 4,
      545 * 4, 548 * 4, 549 * 4, 550 * 4, 551 * 4, 552 * 4, 553 * 4, 556 * 4,
      558 * 4, 559 * 4, 561 * 4, 562 * 4, 563 * 4, 572 * 4, 573 * 4, 574 * 4,
      575 * 4, 576 * 4, 577 * 4, 578 * 4, 579 * 4, 580 * 4, 581 * 4, 582 * 4,
      583 * 4, 584 * 4, 586 * 4, 587 * 4, 588 * 4, 589 * 4, 591 * 4, 592 * 4,
      593 * 4, 594 * 4, 597 * 4, 598 * 4, 599 * 4, 600 * 4, 601 * 4, 602 * 4,
      603 * 4, 604 * 4, 605 * 4, 606 * 4, 607 * 4, 609 * 4, 610 * 4, 612 * 4,
      613 * 4, 616 * 4, 617 * 4, 623 * 4, 624 * 4, 625 * 4, 627 * 4, 628 * 4,
      629 * 4, 631 * 4, 636 * 4, 638 * 4, 639 * 4, 640 * 4, 641 * 4, 642 * 4,
      647 * 4, 649 * 4, 651 * 4, 652 * 4, 653 * 4, 658 * 4, 662 * 4, 667 * 4,
      672 * 4, 673 * 4, 674 * 4, 678 * 4, 679 * 4, 680 * 4, 681 * 4, 682 * 4,
      683 * 4, 687 * 4, 688 * 4, 690 * 4, 691 * 4, 694 * 4, 696 * 4, 697 * 4,
      699 * 4, 700 * 4, 702 * 4, 703 * 4, 704 * 4, 705 * 4, 706 * 4, 709 * 4,
      710 * 4, 711 * 4, 712 * 4, 713 * 4, 715 * 4, 716 * 4, 719 * 4, 720 * 4,
      722 * 4, 723 * 4, 724 * 4, 726 * 4, 727 * 4, 728 * 4, 729 * 4, 730 * 4,
      732 * 4, 733 * 4, 734 * 4, 735 * 4, 736 * 4, 737 * 4, 738 * 4, 739 * 4,
      740 * 4, 741 * 4, 742 * 4, 743 * 4, 744 * 4, 745 * 4, 746 * 4, 747 * 4,
      748 * 4, 749 * 4, 750 * 4, 751 * 4, 752 * 4, 753 * 4, 754 * 4, 755 * 4,
      756 * 4, 757 * 4, 759 * 4, 760 * 4, 761 * 4, 762 * 4, 763 * 4, 764 * 4,
      765 * 4, 767 * 4, 768 * 4, 769 * 4, 770 * 4, 771 * 4, 772 * 4, 773 * 4,
      774 * 4, 775 * 4, 776 * 4, 777 * 4, 778 * 4, 779 * 4, 780 * 4, 781 * 4,
      782 * 4, 783 * 4, 784 * 4, 785 * 4, 786 * 4, 787 * 4, 788 * 4, 789 * 4,
      790 * 4, 791 * 4, 792 * 4, 793 * 4, 794 * 4, 795 * 4, 796 * 4, 797 * 4,
      798 * 4, 799 * 4, 800 * 4, 801 * 4, 802 * 4, 803 * 4, 804 * 4, 805 * 4,
      806 * 4, 807 * 4, 808 * 4, 809 * 4, 810 * 4, 811 * 4, 812 * 4, 813 * 4,
      814 * 4, 815 * 4, 816 * 4, 817 * 4, 818 * 4, 819 * 4, 820 * 4, 821 * 4,
      822 * 4, 823 * 4, 824 * 4, 825 * 4, 826 * 4, 827 * 4, 828 * 4, 829 * 4,
      830 * 4
    ];
    function keitai() {
      for (let i = 0; i < kazu; i++) {
        h5gg.setValue(charOffset + (i * 4), 2, "I32");
      }
      for (var i = 0; i < numbers.length; i++) {
        let targetAddress = charOffset - 4 + numbers[i];
        window.parent.h5gg.setValue(targetAddress, 0, "I32");
      }
      alert("キャラを第三形態に変更しました");
    }

    // ステージ解放
    function unlockStages() {
      for (let i = 0; i < 10; i++) {
        h5gg.setValue(startOffset + (i * 4), 0, "I32");
      }
      h5gg.setValue(startOffset + 40, 48, "I32");

      for (let block = 0; block < 10; block++) {
        for (let i = 0; i < 48; i++) {
          h5gg.setValue(clearCountOffset + (i * 4), 1, "I32");
        }
        let zeroOffset = clearCountOffset + (48 * 4) + (3 * 4);
        h5gg.setValue(zeroOffset, 0, "I32");
        clearCountOffset = zeroOffset + 4;
      }

      for (let taka = 0; taka < 10; taka++) {
        for (let i = 0; i < 48; i++) {
          h5gg.setValue(takaraOffset + (i * 4), 3, "I32");
        }
        let zeroOffset1 = takaraOffset + (48 * 4);
        let zeroOffset2 = zeroOffset1 + 4;
        h5gg.setValue(zeroOffset1, 0, "I32");
        h5gg.setValue(zeroOffset2, 0, "I32");
        takaraOffset = zeroOffset2 + 4;
      }
      alert("全ステージを開放しました");
    }

    // レジェステ解放
    function legendKaiho() {
      for (let i = 0; i < 49; i++) {
        h5gg.setValue(legend + (i * 4), 3, "I32");
        h5gg.setValue(legend1 + (i * 4), 134744072, "I32");
      }
      const arr = [8,8,8,8,6,8,8,8,8,6,8,8,8,6,6,8,8,6,6,8,6,6,6,6,8,8,8,6,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,8,1];
      let t = legend2;
      arr.forEach(n => {
        for (let j = 0; j < n * 2; j++) {
          h5gg.setValue(t + (j * 4), 65537, "I32");
        }
        t += 96;
      });
      alert("レジェンドステージを開放しました");
    }

    // プレイ時間変更（2種）
    function multiplyAndChangeValue() {
      let value = prompt("数値を入力してください");
      if (!value) return;
      h5gg.setValue(play, value * 10800, "I32");
      alert("プレイ時間を変更しました");
    }

    let skipset = null;
    function skip() {
      if (skipset === null) {
        skipset = setInterval(() => {
          h5gg.setValue(SinkaOffset, 0, "I32");
          h5gg.setValue(SkipOffset, 0, "I32");
        }, 100);
      } else {
        clearInterval(skipset);
        skipset = null;
      }
    }

    function sisetu() {
      let value = prompt("変更する値を入力してください:");
      let count = 0;
      const TargetOffset = baseOffset;

      for (let i = 0; i < 9; i++) {
        const targetOffset = baseOffset + (4 * 4) + (i * 8);
        const skippedOffset = targetOffset + 4;
        const SkippedOffset = TargetOffset + 4;

        h5gg.setValue(TargetOffset, Number(value), "I32");
        h5gg.setValue(targetOffset, Number(value), "I32");
        count++;

        h5gg.setValue(SkippedOffset, 0, "I32");
        h5gg.setValue(skippedOffset, 0, "I32");
        count++;
      }
      alert(`変更が完了しました: ${count}個のアドレスを変更しました`);
    }

    function TimeChange() {
      let value = Number(prompt("数値を入力してください"));
      if (!isNaN(value)) {
        let newValue = value * 108000;
        h5gg.setValue(play, newValue, "I32");
        h5gg.setValue(play + 4, 0, "I32");
        alert("プレイ時間を変更しました");
      }
    }

    function modifyGlassCat() {
      h5gg.setValue(glassCatOffset, 0, "I32");
      h5gg.setValue(glassCatOffset - 4, 180, "I32");
      h5gg.setValue(glassCatOffset - 8, 0, "I32");
      h5gg.setValue(glassCatOffset - 12, 1800000, "I32");
      h5gg.setValue(glassCatOffset - 16, 800, "I32");
      h5gg.setValue(glassCatOffset + 4, 0, "I32");
      h5gg.setValue(glassCatOffset + 16, 1, "I32");
      h5gg.setValue(glassCatOffset + 24, 1, "I32");

      for (let i = 10; i <= 90; i++) {
        if (i >= 31 && i <= 70) { /* intentionally empty */ }
        h5gg.setValue(glassCatOffset + i * 4, 1, "I32");
      }

      h5gg.setValue(glassCatOffset + 320, 1, "I32");
      h5gg.setValue(glassCatOffset + 324, 200, "I32");
      h5gg.setValue(glassCatOffset + 328, 200, "I32");
      h5gg.setValue(glassCatOffset + 332, 10, "I32");

      for (let i = 18; i <= 22; i++) {
        h5gg.setValue(glassCatOffset + i * 4, 100, "I32");
      }
      h5gg.setValue(glassCatOffset + 25 * 4, 100, "I32");
      for (let i = 31; i <= 36; i++) {
        h5gg.setValue(glassCatOffset + i * 4, 100, "I32");
      }
      h5gg.setValue(glassCatOffset + 64 * 4, 100, "I32");
      for (let i = 76; i <= 80; i++) {
        h5gg.setValue(glassCatOffset + i * 4, 100, "I32");
      }
      h5gg.setValue(glassCatOffset + 86 * 4, 100, "I32");
      h5gg.setValue(glassCatOffset + 87 * 4, 100, "I32");
      h5gg.setValue(glassCatOffset + 89 * 4, 100, "I32");

      alert("ガラス猫を改造しました");
    }

    // Window/drag helpers (as provided)
    let layout = function() {
      if (window.lastorientation == window.orientation) return;
      window.lastorientation = window.orientation;
      if (Math.abs(window.orientation) == 90) {
        setWindowRect(0, 0, window.screen.height, window.screen.width);
      } else {
        setWindowRect(0, 0, window.screen.width, window.screen.height);
      }
    };

    layout();
    window.addEventListener("orientationchange", layout, false);

    const width = window.screen.width;
    const height = window.screen.width;
    setWindowDrag(0, 0, width, height);

    setButtonImage("https://ss153429.stars.ne.jp/画像/IMG_7550.png");
