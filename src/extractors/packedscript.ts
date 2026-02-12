interface ScriptContent {
  scripts: string[];
}

export class ScriptExtractor {
  scriptContent: ScriptContent = { scripts: [] };
  currentScript: string = '';
  isScriptTag: boolean = false;

  element(element: HTMLRewriterTypes.Element) {
    const type = element.getAttribute('type');
    console.log(type);
    if (type === 'text/javascript' || !type) {
      this.isScriptTag = true;
      this.currentScript = '';
    }
  }

  text(text: HTMLRewriterTypes.Text) {
    if (this.isScriptTag) {
      this.currentScript += text.text;
    }
  }

  elementEnd(element: HTMLRewriterTypes.Element) {
            console.log("Fr", this.currentScript);
    if (element.tagName === 'script' && this.isScriptTag) {
      if (this.currentScript.includes("eval")) {
        console.log("Fr", this.currentScript);
        this.scriptContent.scripts.push(this.currentScript);
      }
      this.isScriptTag = false;
      this.currentScript = '';
    }
  }
}