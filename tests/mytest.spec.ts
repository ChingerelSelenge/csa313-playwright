import { test, expect } from '@playwright/test';

//Тест 1: Зөв нэвтрэх мэдээллээр амжилттай нэвтэрч, Products хуудас гарч ирснийг шалгаад, дараа нь logout хийж эхний хуудас руу буцаж байгааг баталгаажуулна.
test('Амжилттай нэвтрэх', async ({ page }) => {
  // Saucedemo дэлгүүрийн нүүр хуудас руу орох
  await page.goto('https://www.saucedemo.com');

  // Хэрэглэгчийн нэр, нууц үгийг зөв бөглөх
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // Login товч дарж нэвтрэх үйлдэл гүйцэтгэх
  await page.getByRole('button', { name: 'Login' }).click();

  // Нэвтэрсний дараа "Products" гарчиг харагдаж байгаа эсэхийг шалгах
  await expect(page.getByText('Products', { exact: true })).toBeVisible();

  // menu нээгээд Logout дарах 
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();

  // Logout хийсний дараа эхний нэвтрэх хуудас руу буцсан эсэхийг URL-ээр шалгах
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

// Тест 2: Буруу нууц үгээр нэвтрэхэд алдааны мессеж зөв гарч байгааг шалгана.
test('Буруу нууц үгээр нэвтрэх', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Хэрэглэгчийн нэр зөв, харин нууц үгийг санаатайгаар буруу оруулах
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: 'Login' }).click();

  // Системийн буцаах ёстой алдааны мессежийг яг тэр агуулгаар нь шалгах
  await expect(
    page.getByText(
      'Epic sadface: Username and password do not match any user in this service',
      { exact: true }
    )
  ).toBeVisible();
  
  // Нэвтэрч чадаагүй тул хуудас өөрчлөгдөөгүй, URL хэвээрээ байгааг баталгаажуулах
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

// Тест 3: Амжилттай нэвтэрсний дараах үйлдэл — сагсанд бараа нэмэх
test('бараа сагслах', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Жагсаалтын эхний барааны "Add to cart" товчийг дарах
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // Сагсны дугаар (badge) "1" болсныг шалгаж, бараа амжилттай нэмэгдсэнийг батлах
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();

  // Logout хийсний дараа эхний нэвтрэх хуудас руу буцсан эсэхийг URL-ээр шалгах
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
