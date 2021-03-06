import path from "path";
import { Log4brainsError, ValueObject } from "@src/domain";
import { forceUnixPath } from "@src/lib/paths";

type Props = {
  cwdAbsolutePath: string;
  pathRelativeToCwd: string;
};

export class FilesystemPath extends ValueObject<Props> {
  constructor(cwdAbsolutePath: string, pathRelativeToCwd: string) {
    super({
      cwdAbsolutePath: forceUnixPath(cwdAbsolutePath),
      pathRelativeToCwd: forceUnixPath(pathRelativeToCwd)
    });

    if (!path.isAbsolute(cwdAbsolutePath)) {
      throw new Log4brainsError("CWD path is not absolute", cwdAbsolutePath);
    }
  }

  get cwdAbsolutePath(): string {
    return this.props.cwdAbsolutePath;
  }

  get pathRelativeToCwd(): string {
    return this.props.pathRelativeToCwd;
  }

  get absolutePath(): string {
    return forceUnixPath(
      path.join(this.props.cwdAbsolutePath, this.pathRelativeToCwd)
    );
  }

  get basename(): string {
    return forceUnixPath(path.basename(this.pathRelativeToCwd));
  }

  get extension(): string {
    // with the dot (.)
    return path.extname(this.pathRelativeToCwd);
  }

  get basenameWithoutExtension(): string {
    if (!this.extension) {
      return this.basename;
    }
    return this.basename.substring(
      0,
      this.basename.length - this.extension.length
    );
  }

  join(p: string): FilesystemPath {
    return new FilesystemPath(
      this.cwdAbsolutePath,
      path.join(this.pathRelativeToCwd, p)
    );
  }

  relative(to: FilesystemPath, amIaDirectory = false): string {
    const from = amIaDirectory
      ? this.absolutePath
      : path.dirname(this.absolutePath);
    return forceUnixPath(path.relative(from, to.absolutePath));
  }

  public equals(vo?: ValueObject<Props>): boolean {
    // We redefine ValueObject's equals() method to test only the computed absolutePath
    // because in some the pathRelativeToCwd can be different but targets the same location
    if (vo === null || vo === undefined || !(vo instanceof FilesystemPath)) {
      return false;
    }
    return this.absolutePath === vo.absolutePath;
  }
}
