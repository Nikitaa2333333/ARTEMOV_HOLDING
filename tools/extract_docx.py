import zipfile
import xml.etree.ElementTree as ET
import os

def extract_text(docx_path):
    try:
        with zipfile.ZipFile(docx_path) as z:
            xml_content = z.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            text = []
            for p in tree.iterfind('.//w:p', namespace):
                texts = [node.text for node in p.iterfind('.//w:t', namespace) if node.text]
                if texts:
                    text.append(''.join(texts))
            return '\n'.join(text)
    except Exception as e:
        return f"Ошибка извлечения: {e}"

if __name__ == '__main__':
    doc_path = r'c:\Users\User\Downloads\site moscow\Текст для сайта Архар.docx'
    out_path = r'c:\Users\User\Downloads\site moscow\.tmp\content.txt'
    
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    text = extract_text(doc_path)
    
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(text)
        
    print(f"Текст успешно извлечен в файл: {out_path}")
