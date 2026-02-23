import { forumTimelinePosts } from '@/lib/mock/forums'
import { MetaLine, Thumb } from '@/components/feed/shared'

export default function ForumsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded border border-brand-gray-200 bg-brand-white p-5 sm:p-6">
        <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Community</div>
        <h1 className="mt-1 text-3xl font-[800] tracking-tightish sm:text-4xl">Forums</h1>
        <p className="mt-3 max-w-2xl text-sm text-brand-gray-700 sm:text-base">
          A social timeline for episode talk, drops, and everything in between. (Mock data for now.)
        </p>
      </section>

      <section className="space-y-4">
        <div className="rounded border border-brand-gray-200 bg-brand-white p-5 sm:p-6">
          <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">Timeline</div>
          <h2 className="mt-1 text-2xl font-[800] tracking-tightish">Latest posts</h2>

          <div className="mt-5 space-y-4">
            {forumTimelinePosts.map((post) => (
              <article key={post.id} className="rounded border border-brand-gray-200 bg-brand-white p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[240px,1fr]">
                  <div>
                    <Thumb label={post.thumbnailLabel} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex rounded border border-brand-gray-200 bg-brand-gray-50 px-2 py-1 text-[11px] font-[800] uppercase tracking-wide text-brand-gray-700">
                        {post.categoryTitle}
                      </span>
                    </div>

                    <h3 className="mt-2 text-lg font-[800] tracking-tightish text-brand-black">{post.title}</h3>

                    <div className="mt-2">
                      <MetaLine author={post.author} timestamp={post.timestampIso} />
                    </div>

                    <p className="mt-3 text-sm text-brand-gray-700">{post.excerpt}</p>

                    <div className="mt-4 rounded border border-brand-gray-200 bg-brand-gray-50 p-3">
                      <div className="text-xs font-[800] uppercase tracking-wide text-brand-gray-600">
                        Top comments
                      </div>
                      <div className="mt-3 space-y-3">
                        {post.topComments.slice(0, 2).map((c) => (
                          <div key={c.id} className="rounded border border-brand-gray-200 bg-brand-white p-3">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                              <div className="text-xs font-[800] tracking-tightish text-brand-black">{c.author}</div>
                              <div className="text-xs text-brand-gray-600">{new Date(c.timestampIso).toLocaleDateString()}</div>
                            </div>
                            <div className="mt-2 text-sm text-brand-gray-700">{c.body}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
