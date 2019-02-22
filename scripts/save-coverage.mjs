import path from 'path'
import fileSystem from 'fs'

const fs = fileSystem.promises
let cwd = process.cwd()
const ARGS = process.argv
;(async function() {
  let coverage, total
  try {
    const coverageFile = path.join(cwd, 'coverage/coverage-summary.json')
    coverage = await fs.readFile(coverageFile, 'utf8')
  } catch (e) {
    throw new Error(
      'Unable to read coverage/coverage-summary.json, please ensure the file was created by running `yarn test:cov`'
    )
  }
  coverage = JSON.parse(coverage)
  const fileCoverages = Object.keys(coverage).reduce((agg, k) => {
    if (k === 'total') {
      total = coverage[k]
      return agg
    }
    const relativePath = k.replace(cwd, '')
    agg[relativePath] = coverage[k]
    return agg
  }, {})
  const markdown = generateMarkdown(total, fileCoverages)

  // run as tests or write
  if (ARGS.includes('--test')) {
    const documentedCoverage = await fs.readFile(path.join(cwd, 'Coverage.md'), 'utf8')
    if (documentedCoverage !== markdown) {
      console.error('[ERR] current coverage does not match documented coverage')
      console.error(
        '\n\tRun `yarn test` locally to update documented coverage and commit changes.\n'
      )
      process.exit(1)
    } else {
      console.log('\n[SUCCESS] documented coverage matches current test coverage.\n')
    }
  } else {
    await Promise.all([
      updateBadge(total),
      fs.writeFile(path.join(cwd, 'Coverage.md'), markdown, 'utf8'),
    ])
  }
})().catch(error => {
  console.log(error.stack)
  console.error(`[ERR] there was an unexpected error displayed above`)
  process.exit(1)
})

async function updateBadge(report) {
  const badgeUrl = getBadgeUrl(report)
  const readme = await fs.readFile(path.join(cwd, 'README.md'), 'utf8')
  const updated = readme.replace(
    /!\[Coverage\s[0-9\.]+?%\]\(.*?\)/,
    generateBadgeMarkdown(report.lines.pct, badgeUrl)
  )
  await fs.writeFile(path.join(cwd, 'README.md'), updated, 'utf8')
}

function getBadgeUrl(report) {
  const coverage = report.lines.pct
  const color = coverage < 80 ? 'red' : coverage < 90 ? 'yellow' : 'brightgreen'
  const covStr = encodeURI(String(coverage))
  return `https://img.shields.io/badge/Coverage-${covStr}${encodeURI('%')}-${color}.svg`
}

function generateBadgeMarkdown(coverage, badgeUrl) {
  return `![Coverage ${String(coverage)}%](${badgeUrl})`
}

function generateMarkdown(total, files) {
  const maxFileNameLength = Object.keys(files)
    .map(n => n.length)
    .sort()
    .pop()
  return (
    `
# Unit Test Coverage

| ${'File'.padEnd(maxFileNameLength, ' ')} | % Stmts | % Branch | % Funcs | % Lines |
| ${':---'.padEnd(maxFileNameLength, '-')} | ------: | -------: | ------: | ------: |
${generateMdRow(maxFileNameLength, 'Total', total)}
${Object.keys(files)
  .map(name => generateMdRow(maxFileNameLength, name, files[name]))
  .join('\n')}
  `.trim() + '\n'
  )
}

function generateMdRow(filePad, name, report) {
  return `| ${name.padEnd(filePad, ' ')} | ${padReportVal(report.statements)}% | ${padReportVal(
    report.branches,
    7
  )}% | ${padReportVal(report.functions)}% | ${padReportVal(report.lines)}% |`
}

function padReportVal(val, padNumber = 6) {
  return String(val.pct).padStart(padNumber, ' ')
}
