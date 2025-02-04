import * as vscode from "vscode";
import { PreviewPanel } from "../panels/previewPanel";

export function createMermaidFile(diagramContent: string | null) {
  const exampleContent = `flowchart TD
    %% Nodes
        A("fab:fa-youtube Starter Guide")
        B("fab:fa-youtube Make Flowchart")
        n1@{ icon: "fa:gem", pos: "b", h: 24}
        C("fa:fa-book-open Learn More")
        D{"Use the editor"}
        n2(Many shapes)@{ shape: delay}
        E(fa:fa-shapes Visual Editor)
        F("fa:fa-chevron-up Add node in toolbar")
        G("fa:fa-comment-dots AI chat")
        H("fa:fa-arrow-left Open AI in side menu")
        I("fa:fa-code Text")
        J(fa:fa-arrow-left Type Mermaid syntax)

    %% Edge connections between nodes
        A --> B --> C --> n1 & D & n2
        D -- Build and Design --> E --> F
        D -- Use AI --> G --> H
        D -- Mermaid js --> I --> J

    %% Individual node styling. Try the visual editor toolbar for easier styling!
        style E color:#FFFFFF, fill:#AA00FF, stroke:#AA00FF
        style G color:#FFFFFF, stroke:#00C853, fill:#00C853
        style I color:#FFFFFF, stroke:#2962FF, fill:#2962FF

    %% You can add notes with two "%" signs in a row!`;

  vscode.workspace.openTextDocument({ language: "mermaid", content: diagramContent ? diagramContent : exampleContent}).then((document) => {
    vscode.window.showTextDocument(document).then((editor) => {
      if (editor?.document) {
        PreviewPanel.createOrShow(editor.document);
      }
    });
  });
}

function showSyncNotification() {
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  statusBarItem.text = "⚡ This file is in sync with the remote Mermaid chart. Changes will be saved remotely.";
  statusBarItem.backgroundColor = new vscode.ThemeColor("statusBarItem.warningBackground");
  statusBarItem.show();

  // Automatically hide the notification after 10 seconds
  setTimeout(() => statusBarItem.hide(), 10000);
}

export function getPreview() {
  const activeEditor = vscode.window.activeTextEditor;
  
      if (!activeEditor) {
        vscode.window.showErrorMessage("No active editor. Open a .mmd file to preview.");
        return;
      }
  
      const document = activeEditor?.document;
      if (document && document?.languageId !== "plaintext" && !document.fileName.endsWith(".mmd") && !document.fileName.endsWith(".mermaid") && !document.languageId.startsWith('mermaid')) {
        vscode.window.showErrorMessage("Mermaid Preview is only available for mermaid files.");
        return;
      }
      if (document) {
        PreviewPanel.createOrShow(document);
      }
}