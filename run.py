import lianzhong_api
import requests, time, os, random, re, json
from base64 import b64decode
from selenium.webdriver.chrome.options import Options
from selenium.webdriver import ActionChains
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC  # 显性等待
from selenium.webdriver.common.by import By
import cv2 as cv
TG_BOT_TOKEN = ''           # telegram bot token 自行申请
TG_USER_ID = ''             # telegram 用户ID
if "TG_BOT_TOKEN" in os.environ and os.environ["TG_BOT_TOKEN"] and "TG_USER_ID" in os.environ and os.environ["TG_USER_ID"]:
        TG_BOT_TOKEN = os.environ["TG_BOT_TOKEN"]
        TG_USER_ID = os.environ["TG_USER_ID"]
        print("Telegram 推送打开")
def get_email():
    a = random.randint(11, 999)
    b = random.randint(0, 200)
    email = 'varytmp+{}uu{}d@gmail.com'.format(a, b)
    return email
def p_main(user,pass1,invitecode):
            url = 'https://pjj.one/share?userid=' + invitecode
            email=get_email()
            print(email)
            chrome_opt = Options()  # 创建参数设置对象.
            chrome_opt = webdriver.ChromeOptions()
            #chrome_opt.add_argument("'--proxy-server={}".format(porxies))
            chrome_opt.add_argument('--headless')  # 无界面化.
            chrome_opt.add_argument('--disable-gpu')  # 配合上面的无界面化.
            #chrome_opt.add_argument('--window-size=1366,768')  # 设置窗口大小, 窗口大小会有影响.
            chrome_opt.add_argument("--no-sandbox")
            driver = webdriver.Chrome(options=chrome_opt)
            #driver=webdriver.Chrome()
            driver.get(url)
            driver.implicitly_wait(10)
            time.sleep(1)
            # 输入邮箱
            driver.find_element_by_xpath(
                '//*[@id="app"]/section/main/div/div/div[2]/form/div[1]/div[2]/div/span/span/input').send_keys(email)
            #print('正在输入邮箱！')
            # 获取验证码url
            img_str = driver.find_element_by_xpath(
                '//*[@id="app"]/section/main/div/div/div[2]/form/div[2]/div[2]/div/span/span/span/span/img').get_attribute(
                'src')
            #print('找到图片！')
            img_str = img_str.split(",")[-1]  # 删除前面的 “data:image/jpeg;base64,”
            img_str = img_str.replace("%0A", '\n')  # 将"%0A"替换为换行符
            img_data = b64decode(img_str)  # b64decode 解码
            with open('./captcha.gif', 'wb') as fout:
                fout.write(img_data)
                fout.close()
            time.sleep(2)
            #print('验证码图片已保存！')
            im = './captcha.gif'
            s = lianzhong_api.main(user, pass1, im, 'http://v1-http-api.jsdama.com/api.php?mod=php&act=upload', '', '',
                                   '1008', '8dc962b56f1968a844450834ef91bfd0')
            #print(s.json())
            code = s.json()['data']['val']
            yzm_id=s.json()['data']['id']
            print('图片已识别:'+code)
            driver.find_element_by_xpath(
                '//*[@id="app"]/section/main/div/div/div[2]/form/div[2]/div[2]/div/span/span/span/input').send_keys(
                code)
            #print('正在输入图片验证码！')
            time.sleep(1)
            driver.find_element_by_xpath(
                '//*[@id="app"]/section/main/div/div/div[2]/form/div[3]/div[2]/div/span/span/span/span/button').click()
            #print('正在发送邮箱验证码！')
            time.sleep(10)
            #print('等待邮箱验证码！')
            os.remove(im)
            #print('正在移除保存的图片！')
            im_code=get_num(email)
            print(im_code)
            print('验证码已识别：'+im_code[0])
            driver.find_element_by_xpath(
                '//*[@id="app"]/section/main/div/div/div[2]/form/div[3]/div[2]/div/span/span/span/input').send_keys(
                im_code[0])
            #print('正在输入邮箱验证码！')
            driver.find_element_by_xpath(
                '//*[@id="app"]/section/main/div/div/div[2]/form/div[4]/div[2]/div/span/span/input').send_keys(
                'qwer1234')
            #print('正在输入密码！')
            time.sleep(1)
            driver.find_element_by_xpath('//*[@id="app"]/section/main/div/div/div[2]/div/p[1]/button').click()
            print('正在点击注册完成！')
            time.sleep(2)
            tx_code(driver)
            time.sleep(4)
            if driver.current_url=='https://pjj.one/home':
                telegram_bot("p++", '邀请成功！')
                driver.quit()
            else:
                telegram_bot("P++", '邀请失败！')
                print('邀请失败！')
def telegram_bot(title, content):
    print("\n")
    tg_bot_token = TG_BOT_TOKEN
    tg_user_id = TG_USER_ID
    if "TG_BOT_TOKEN" in os.environ and "TG_USER_ID" in os.environ:
        tg_bot_token = os.environ["TG_BOT_TOKEN"]
        tg_user_id = os.environ["TG_USER_ID"]
    if not tg_bot_token or not tg_user_id:
        print("Telegram推送的tg_bot_token或者tg_user_id未设置!!\n取消推送")
        return
    print("Telegram 推送开始")
    send_data = {"chat_id": tg_user_id, "text": title +
                 '\n\n'+content, "disable_web_page_preview": "true"}
    response = requests.post(
        url='https://api.telegram.org/bot%s/sendMessage' % (tg_bot_token), data=send_data)
    print(response.text)
def get_num(email):
    global Driver
    #print(email)
    head = {
        'Cookie': 'csrf_gmailnator_cookie=9283eccf4672e233327c1d07cbde2fbe; __gads=ID=808c92a03a3667c7-2268f1463cc6007d:T=1614844196:RT=1614845007:S=ALNI_MaEB-hZfUPTo6kHkEmOBLzPe4nqTQ; cto_bundle=AGHOXV9XSVpTNzY3TlRHbldjMDY5RFhQTlU4Y2J1cUpIWGNLVU0xa3ZiWGRKV1duNHo5cXpJYSUyQm5mZ0ROVDJBRFlIa211cG85JTJCOElMV0ZGQUIzVCUyRjg4NTdQZmZSSW9xMzZmMVY5dXdXeDViUUFYeG51SWNibEhqZGxqWGU5NjBQZHpxMg; _ga=GA1.2.1618068840.1614844229; _gid=GA1.2.103981802.1614844229; ci_session=15d382f04f7b998cecd0f9158bfe3db2c8f32629; __cfduid=d1f9a21dd34e5060cfd24ea55f37149961614844181'}
    data = {'csrf_gmailnator_token': '9283eccf4672e233327c1d07cbde2fbe', 'action': 'LoadMailList',
            'Email_address': email}
    try:
        s = requests.post(url='https://www.gmailnator.com/mailbox/mailboxquery', data=data, headers=head).text
        id = re.findall(r'(?<=messageid\\/#).+(?=\\">\\n\\t\\t\\t\\t\\t<table class=\\"message_container)', s)[0]
        #print(id)
        data1 = {'csrf_gmailnator_token': '9283eccf4672e233327c1d07cbde2fbe', 'action': 'get_message', 'message_id': id,'email': 'varytmp'}
        mess = requests.post(url='https://www.gmailnator.com/mailbox/get_single_message/', headers=head, data=data1).json()
        #print(mess)
        yanzhenma = mess['content']

        im_code = re.findall(r'(?<=验证码为 <b>).+(?=</b>，有效)', yanzhenma)
        return im_code
    except Exception as e:
        print(e)
def tx_code(browser):
    """这里需要访问，带有滑动验证码的页面，然后会获取滑块对其进行滑动"""
    browser.implicitly_wait(10)
    browser.switch_to.frame("tcaptcha_iframe")  # 等待 iframe
    #browser.switch_to.frame(browser.find_element_by_id('tcaptcha_iframe'))  # 加载 iframe
    time.sleep(0.5)
    bk_block = browser.find_element_by_xpath('//img[@id="slideBg"]').get_attribute('src')
    print(bk_block)
    if save_img(bk_block):
        dex = get_pos()
        track_list = get_track(dex)
        time.sleep(0.5)
        slid_ing = browser.find_element_by_xpath('// *[ @ id = "tcaptcha_drag_thumb"]')  # 滑块定位
        ActionChains(browser).click_and_hold(on_element=slid_ing).perform()  # 鼠标按下
        time.sleep(0.2)
        print('轨迹', track_list)
        for track in track_list:
            ActionChains(browser).move_by_offset(xoffset=track, yoffset=0).perform()  # 鼠标移动到距离当前位置（x,y）
        time.sleep(1)
        ActionChains(browser).release(on_element=slid_ing).perform()  # print('第三步,释放鼠标')
        time.sleep(5)
        # 识别图片
        return True
    else:
        print('缺口图片捕获失败')
        return False

def save_img(bk_block):
    """保存图片"""
    try:
        img = requests.get(bk_block).content
        with open('bg.jpeg', 'wb') as f:
            f.write(img)
        return True
    except:
        return False


def get_pos():
    """识别缺口
    注意：网页上显示的图片为缩放图片，缩放 50% 所以识别坐标需要 0.5
    """
    image = cv.imread('bg.jpeg')
    blurred = cv.GaussianBlur(image, (5, 5), 0)
    canny = cv.Canny(blurred, 200, 400)
    contours, hierarchy = cv.findContours(canny, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
    for i, contour in enumerate(contours):
        m = cv.moments(contour)
        if m['m00'] == 0:
            cx = cy = 0
        else:
            cx, cy = m['m10'] / m['m00'], m['m01'] / m['m00']
        if 6000 < cv.contourArea(contour) < 8000 and 370 < cv.arcLength(contour, True) < 390:
            if cx < 400:
                continue
            x, y, w, h = cv.boundingRect(contour)  # 外接矩形
            cv.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)
            # cv.imshow('image', image)  # 显示识别结果
            print('【缺口识别】 {x}px'.format(x=x/2))
            return x/2
    return 0


def get_track(distance):
    """模拟轨迹
    """
    distance -= 37  # 初始位置
    # 初速度
    v = 0
    # 单位时间为0.2s来统计轨迹，轨迹即0.2内的位移
    t = 0.2
    # 位移/轨迹列表，列表内的一个元素代表0.2s的位移
    tracks = []
    # 当前的位移
    current = 0
    # 到达mid值开始减速
    mid = distance * 7 / 8

    distance += 10  # 先滑过一点，最后再反着滑动回来
    # a = random.randint(1,3)
    while current < distance:
        if current < mid:
            # 加速度越小，单位时间的位移越小,模拟的轨迹就越多越详细
            a = random.randint(2, 4)  # 加速运动
        else:
            a = -random.randint(3, 5)  # 减速运动

        # 初速度
        v0 = v
        # 0.2秒时间内的位移
        s = v0 * t + 0.5 * a * (t ** 2)
        # 当前的位置
        current += s
        # 添加到轨迹列表
        tracks.append(round(s))

        # 速度已经达到v,该速度作为下次的初速度
        v = v0 + a * t

    # 反着滑动到大概准确位置
    for i in range(4):
        tracks.append(-random.randint(2, 3))
    for i in range(4):
        tracks.append(-random.randint(1, 3))
    return tracks

def move_to(index):
    """滑动滑块"""
    pass


def main():
    user=os.environ["USER"]
    pass1=os.environ["PASSWORD"]
    invitecode=os.environ["INVITECODE"]
    points=lianzhong_api.get_points(user,pass1)
    points=points.json()['data']
    print('剩余点数：'+str(points))
    if int(points)<=2:
        print('点数不足！！')
        time.sleep(5)
        telegram_bot("p++", '点数不足！')
        exit()
    else:
        print('start')
        p_main(user,pass1,invitecode)


if __name__ == '__main__':
    main()
