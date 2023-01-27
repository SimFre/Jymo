#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

fn main() {
    tauri::Builder::default()
        //.invoke_handler(tauri::generate_handler![greet])
        //.invoke_handler(tauri::generate_handler![zzz])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// use std::os::windows;

// use windows::{
//     core::*, Data::Xml::Dom::*, Win32::Foundation::*, Win32::System::Threading::*,
//     Win32::UI::WindowsAndMessaging::*,
// };

//#[tauri::command]
//fn greet(name: &str) -> String {
//     let doc = XmlDocument::new()?;
//     doc.LoadXml(h!("<html>hello world</html>"))?;

//     let root = doc.DocumentElement()?;
//     assert!(root.NodeName()? == "html");
//     assert!(root.InnerText()? == "hello world");

//     unsafe {
//         let event = CreateEventW(None, true, false, None)?;
//         SetEvent(event).ok()?;
//         WaitForSingleObject(event, 0);
//         CloseHandle(event).ok()?;

//         MessageBoxA(None, s!("Ansi"), s!("Caption"), MB_OK);
//         MessageBoxW(None, w!("Wide"), w!("Caption"), MB_OK);
//     }
//format!("Hello, {}!", name)
//}

// #[tauri::command]
// fn zzz() -> String {
//     let doc = XmlDocument::new()?;
//     doc.LoadXml(h!("<html>hello world</html>"))?;

//     let root = doc.DocumentElement()?;
//     assert!(root.NodeName()? == "html");
//     assert!(root.InnerText()? == "hello world");

//     unsafe {
//         let event = CreateEventW(None, true, false, None)?;
//         SetEvent(event).ok()?;
//         WaitForSingleObject(event, 0);
//         CloseHandle(event).ok()?;

//         MessageBoxA(None, s!("Ansi"), s!("Caption"), MB_OK);
//         MessageBoxW(None, w!("Wide"), w!("Caption"), MB_OK);
//     }

//     //Ok(())
//     format!("MEEH, {}!", "MEH");
// }
