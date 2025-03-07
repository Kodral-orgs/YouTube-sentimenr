import { VSCodeButton, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { useEffect, useState } from "react"
import { useExtensionState } from "../../context/ExtensionStateContext"
import { validateApiConfiguration } from "../../utils/validate"
import { vscode } from "../../utils/vscode"
import ApiOptions from "../settings/ApiOptions"

const WelcomeView = () => {
	const { apiConfiguration } = useExtensionState()

	const [apiErrorMessage, setApiErrorMessage] = useState<string | undefined>(undefined)

	const disableLetsGoButton = apiErrorMessage != null

	const handleSubmit = () => {
		vscode.postMessage({ type: "apiConfiguration", apiConfiguration })
	}

	useEffect(() => {
		setApiErrorMessage(validateApiConfiguration(apiConfiguration))
	}, [apiConfiguration])

	return (
		<div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, padding: "0 20px" }}>
			<p>
				<a href="https://github.com/coolcline/coolcline.git">Cool Cline</a>, is an agentic coding assistant that
				combines the best features of <a href="https://github.com/coolcline/coolcline.git">Cline</a>,{" "}
				<a href="https://github.com/RooVetGit/Roo-Cline.git">Roo Cline</a> and{" "}
				<a href="https://github.com/jnorthrup/Bao-Cline.git">Bao Cline</a>. Working seamlessly with your{" "}
				<strong>Command Line Interface</strong> and <strong>Editor</strong>, it brings you the most powerful AI
				development experience. Thanks to all their <code>Clines</code> contributors!
			</p>

			<p>
				I can do all kinds of tasks thanks to the latest breakthroughs in{" "}
				<VSCodeLink
					href="https://www-cdn.anthropic.com/fed9cc193a14b84131812372d8d5857f8f304c52/Model_Card_Claude_3_Addendum.pdf"
					style={{ display: "inline" }}>
					Claude 3.5 Sonnet's agentic coding capabilities
				</VSCodeLink>{" "}
				and access to tools that let me create & edit files, explore complex projects, use the browser, and
				execute terminal commands (with your permission, of course). I can even use MCP to create new tools and
				extend my own capabilities.
			</p>

			<b>To get started, this extension needs an API provider for Claude 3.5 Sonnet.</b>

			<div style={{ marginTop: "10px" }}>
				<ApiOptions showModelOptions={false} />
				<VSCodeButton onClick={handleSubmit} disabled={disableLetsGoButton} style={{ marginTop: "3px" }}>
					Let's go!
				</VSCodeButton>
			</div>
		</div>
	)
}

export default WelcomeView
