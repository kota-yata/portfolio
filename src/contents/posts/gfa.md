---
title: 毎朝5時にGoogle Formに自動回答したい
date: 2020-08-11
category: プログラミング
description: SeleniumとLambdaを使った自動化の記事
ogp: /ogp.jpeg
---

みなさんこんにちは。夏ですね。
僕もついに部活動が再開し、ワクワクドキドキな訳ですが、一昨日の夜顧問からこんな連絡がきました。

```
- 毎朝5時20分までに検温を行い、結果をGoogleFormから報告してください
- 報告がなかった部員は朝練の参加を認めません
```

そもそも朝練が6時半から始まる時点でイッているので5時20分に連絡しろと言われてもさほど驚かなかったのですが、ここで一つ問題が発生しました。

というのも僕は普段朝5時に起き、そのままパンをかじりながら自転車で駅に向かうので、検温をする時間がないのです。もう少し早起きすれば済む話なのですが、4時起きは流石にきついし体がもたないのでやりたくない。かといって5時に起きて検温なんかしていたら朝練そのものに遅れてしまう。

というわけで、朝5時くらいに、心配されない程度の体温をよしなに指定のFormに入力して送信してくれるプログラムを作りたいと思います。

## Seleniumでフォームを送信する
本物のフォームを使ってやると僕の身元がバレてしまうので、今回は[テスト用に僕が作成した本物と同じ内容のフォーム](https://docs.google.com/forms/d/e/1FAIpQLScGgZ8dsBkcSVutvW3JgDLqy3pIEKk12ucjiA8mNQrKopILog/viewform)で実装したいと思います。
### 初期値入力つきURLを用意する
Google Formは、パラメータをつけることで各質問の値を入力した状態でURLを開くことができます。
普通にフォームを開く際のURLは

https://docs.google.com/forms/d/e/1FAIpQLScGgZ8dsBkcSVutvW3JgDLqy3pIEKk12ucjiA8mNQrKopILog/viewform?usp=sf_link

こんな感じでviewformの後に「usp=sf_link」というパラメータがついています。このパラメータは事前入力のない、ピュアな回答フォームであることを示しているので、まずここを「usp=pp_url」に変えて、事前入力があることを知らせてあげます。
&nbsp;  
&nbsp;  
そしたら次に各質問の回答をパラメータに入力していきます。フォームの各質問を識別する番号があるので、Chromeの検証画面で質問のdivを探し、2階層目で以下のような番号を探します。
![スクリーンショット 2020-08-07 16.56.07.jpg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/502570/d48564de-3d9c-07e0-7aec-755e1b4444d5.jpeg)
番号を見つけたら```entry.番号=回答内容```の形でパラメータを加えます。今回は名前と体温をテキストで入力するので以下のようなURLになります。

https://docs.google.com/forms/d/e/1FAIpQLScGgZ8dsBkcSVutvW3JgDLqy3pIEKk12ucjiA8mNQrKopILog/viewform?usp=pp_url&entry.1534939278=荒川智則&entry.511939456=36.5
しかしこのままだと毎日36.5度を報告することになり、流石に怪しまれるので、乱数で良い感じに値を振ります。

```python
# 36.1~36.7の間でランダムに値を生成して文字列変換
body_temp = str(36 + random.randint(1,7)/10)
# URLの最後に加える
url = 'https://docs.google.com/forms/d/e/1FAIpQLScGgZ8dsBkcSVutvW3JgDLqy3pIEKk12ucjiA8mNQrKopILog/viewform?usp=pp_url&entry.1534939278=荒川智則&entry.511939456='+body_temp
```

### Seleniumで自動提出
URLが完成したら、あとはSeleniumでURLを開き、ポチッと提出ボタンを押してもらうだけです。

```python
# SeleniumとChromedriverをpipでインストールしておく
from selenium import webdriver
import chromedriver_binary
import time
import random

body_temp = str(36 + random.randint(1,7)/10)
url = 'https://docs.google.com/forms/d/e/1FAIpQLScGgZ8dsBkcSVutvW3JgDLqy3pIEKk12ucjiA8mNQrKopILog/viewform?usp=pp_url&entry.1534939278=荒川智則&entry.511939456='+body_temp

# クリックの関数
def click(xpath):
    driver.find_element_by_xpath(xpath).click()

# パスワード入力の関数
def insert_pw(xpath, str):
    driver.find_element_by_xpath(xpath).send_keys(str)

driver = webdriver.Chrome()
driver.implicitly_wait(1)
driver.get(url)

moving_login_button = '/html/body/div[2]/div/div[2]/div[3]/div[2]'
time.sleep(1)

# Googleアカウントでのログインが必要な場合はログインする
if(driver.find_elements_by_xpath(moving_login_button) != []):
  click(moving_login_button)
  login_id = "{Googleアカウントのメアド}"
  login_id_xpath = '/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div[1]/div/div[1]/div/div[1]/input'
  login_id_button = '/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[2]/div/div[1]/div/div'
  insert_pw(login_id_xpath, login_id)
  click(login_id_button)
  time.sleep(1)
  login_pw = "{Googleアカウントのパスワード}"
  login_pw_xpath = '/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/div[1]/input'
  login_pw_button = '/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[2]/div/div[1]/div/div'
  insert_pw(login_pw_xpath, login_pw)
  time.sleep(1)
  click(login_pw_button)

time.sleep(1)
submit_button = '//*[@id="mG61Hd"]/div[2]/div/div[3]/div[1]/div/div'
click(submit_button)

print("Done!")

driver.close
# メモリーを食うのでちゃんと終了しましょう
driver.quit
```

<img width="500" alt="スクリーンショット 2020-08-07 17.23.49.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/502570/8f8adde5-f6fe-62f3-ad8f-76d6fb22f50d.png">

しっかり送信できました。

## 定期イベントにする
コードが書けたらあとは定期イベント化するだけなのですが、ここで少しつまづいたのでやり方を説明しておきます。
&nbsp;  
&nbsp;  
当初予定していた方法としてはAutomatorでアプリ化し、カレンダーに入れて毎日実行する方法([参考](https://qiita.com/baraobara/items/73d753c678e5c0e72f46#4-mac%E3%81%AE%E3%83%87%E3%83%95%E3%82%A9%E3%83%AB%E3%83%88%E3%81%AEautomator%E3%82%92%E7%94%A8%E3%81%84%E3%81%A6mac%E5%86%85%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92%E4%BD%9C%E3%82%8B))。これなら報告しなくて良い日はカレンダーから外せば良いし、完璧なはず。と思ったのですが、PCをシャットダウンしていると動作しないためボツ。crontabに設定して定期イベント化する方法も同様の理由でボツ。

結局臨機応変にイベントの変更はできないものの、PCの状態にかかわらず実行してくれるAWSのLambdaを使用することに決めました。(Lambdaの使い方は[このサイト](https://www.wakuwakubank.com/posts/519-aws-lambda-introduction/)とかが参考になりました)

### LambdaのレイヤーにSeleniumとChromedriver、headless-chromiumを上げる
Lambdaでライブラリを使うには各フォルダをzipに圧縮してレイヤーにアップロードする必要があります。今回はSeleniumとChromeのWebdriverであるChromedriver、それからChromeを開かずにスクレイピングを行うためのheadless-chromiumを使用するので、それぞれzipに圧縮してレイヤーに上げていきます。
#### 1. Selenium
```
mkdir selenium
cd selenium
mkdir python
cd python
pip install selenium -t .
cd ../
zip -r selenium.zip ./python
```
できたzipファイルをそのままレイヤーにアップロードします。
#### 2. Chromedriverとheadless-chromium
```
curl https://github.com/adieuadieu/serverless-chrome/releases/download/v1.0.0-55/stable-headless-chromium-amazonlinux-2017-03.zip > headless-chromium.zip
curl https://chromedriver.storage.googleapis.com/2.43/chromedriver_linux64.zip > chromedriver.zip
```
できた二つのzipファイルを解凍し、headless-chromeフォルダにまとめます。その後そのheadless-chromeをzipに圧縮してレイヤーにアップロードします。

#### 3. レイヤーを関数に適用
関数の下にある「Layers」を押し、下の「レイヤーの追加」ボタンから二つのレイヤを追加します
<img width="1612" alt="スクリーンショット 2020-08-07 18.36.45.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/502570/27d63d99-6a12-7370-3e32-46851977176f.png">


#### ※注意※
- Lambda関数のランタイムをPython3.8にするとChromedriverが動いてくれなかった(原因不明)ので、ランタイムはPython3.6か3.7に設定することをお勧めします。
- headless-chromiumとChromedriverの間に互換性がないと動作しないので[こちら](http://chromedriver.chromium.org/downloads)から最新版を入手しても動作しない可能性があります。

### Lambda用にコードを少し変える
筆者は今までCloud9以外のAWSツールを使ったことがないへっぽこコーダーなので、色んなサイトの見様見真似でなんとかLambdaで動くコードにしました。先人に感謝。

```python
import json
from selenium import webdriver
import time
import random

def lambda_handler(event, context):
    body_temp = str(36 + random.randint(1,7)/10)
    url = 'https://docs.google.com/forms/d/e/1FAIpQLScGgZ8dsBkcSVutvW3JgDLqy3pIEKk12ucjiA8mNQrKopILog/viewform?usp=pp_url&entry.1534939278=荒川智則&entry.511939456='+body_temp
    options = webdriver.ChromeOptions()
    options.binary_location = '/opt/headless-chrome/headless-chromium'
    # このオプション4つを付けないとChromeは起動せずエラーになります
    options.add_argument('--headless') # サーバーレスでChromeを起動
    options.add_argument('--no-sandbox') # sandbox外でChromeを起動
    options.add_argument('--single-process') # タブ/サイトごとのマルチプロセスではなく、シングルプロセスへ切り替える
    options.add_argument('--disable-dev-shm-usage') # メモリファイルの出力場所を変える
    driver = webdriver.Chrome('/opt/headless-chrome/chromedriver',options = options)
    driver.implicitly_wait(1)
    driver.get(url)
    
    def click(xpath):
        driver.find_element_by_xpath(xpath).click()

    def insert_pw(xpath, str):
        driver.find_element_by_xpath(xpath).send_keys(str)
    
    moving_login_button = '/html/body/div[2]/div/div[2]/div[3]/div[2]'
    time.sleep(2)
    if(driver.find_elements_by_xpath(moving_login_button) != []):
        click(moving_login_button)
        # 環境変数でMY_GMAILにGoogleアカウントのメアドを設定してください
        login_id = MY_GMAIL
        login_id_xpath = '/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div[1]/div/div[1]/div/div[1]/input'
        login_id_button = '/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[2]/div/div[1]/div/div'
        insert_pw(login_id_xpath, login_id)
        click(login_id_button)
        time.sleep(1)
        # 環境変数でMY_PASSWORDにGoogleアカウントのパスワードを設定してください
        login_pw = MY_PASSWORD
        login_pw_xpath = '/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/div[1]/input'
        login_pw_button = '/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[2]/div/div[1]/div/div'
        insert_pw(login_pw_xpath, login_pw)
        time.sleep(1)
        click(login_pw_button)
    time.sleep(1)
    submit_button = '//*[@id="mG61Hd"]/div[2]/div/div[3]/div[1]/div/div'
    click(submit_button)
    driver.close
    driver.quit
    return {
        'statusCode': 200,
        'body': json.dumps('Form submission success!!')
    }

```

#### 注意点
- Chromeの起動オプション```--headless```,```--no-sandbox```,```single-process```,```--disable-dev-shm-usage```を付けないとLambda上で正常に起動せず、エラーが出ます。各オプションについての詳細は[こちら](http://chrome.half-moon.org/43.html)をご覧ください
- レイヤーにアップロードしたファイルはoptディレクトリの配下に置かれます。パスを指定する際はopt/ディレクトリ名/...の形で表記しましょう

### CloudWatch Eventsでトリガーを設定
1. 関数の「Layers」をクリックして「トリガーを追加をクリック」し、ドロップダウンから「EventBridge (CloudWatch Events)」を選択します。
2. ルールは「新規ルールの作成」で任意のルール名を入力。ルールタイプをスケジュール式にし、今回は毎日朝5時なので```corn(0 20 ? * * *)```と入力(LambdaはUTCでトリガーされるので9時間前をセットすることに留意)。トリガーを有効にして「追加」をクリックします。（cronの書き方は[こちら](https://qiita.com/tossh/items/e135bd063a50087c3d6a)をご覧ください）

<img width="810" alt="スクリーンショット 2020-08-07 18.56.44.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/502570/2c07b4d3-295d-7543-7de7-dc8b0efaf40b.png">


## テスト
最後にしっかり動くかテストしましょう。Lambda関数画面の「テスト」をクリックします。
<img width="1613" alt="スクリーンショット 2020-08-07 18.51.28.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/502570/8418067e-0784-9b2c-feeb-624c132e277d.png">
大丈夫そうですね。

## おわりに
朝の検温はサボっていますが、寝る前にちゃんと測っているので安心してください。

## 参考文献
https://masakimisawa.com/selenium_headless-chrome_python_on_lambda/
https://github.com/heroku/heroku-buildpack-google-chrome/issues/56
https://qiita.com/mishimay/items/afd7f247f101fbe25f30
